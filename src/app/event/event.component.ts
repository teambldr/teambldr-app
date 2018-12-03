import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { User } from '../model/user';
import { Message } from '../model/message';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  private usersCollection: AngularFirestoreCollection<User>;
  private messagesCollection: AngularFirestoreCollection<Message>;
  users: Observable<User[]>;
  eventStart: Date;
  isLoading: boolean;

  constructor(private afs: AngularFirestore,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.eventDoc = this.afs.doc<Event>('events/' + id);
    this.event = this.eventDoc.valueChanges();
    this.event.subscribe(e => {
      this.eventStart = e.start.toDate();
      this.isLoading = false;
    });
    this.usersCollection = this.afs.collection<User>('events/' + id + '/users');
    this.messagesCollection = this.afs.collection<Message>('messages');
    this.users = this.usersCollection.valueChanges();
  }

  sendNotifications() {
    this.eventDoc.ref.get().then(eventDoc => {
      const event = eventDoc.data() as Event;
      const newMessage: Message = {
        fcmToken: '',
        title: event.name,
        body: event.start.toDate().toLocaleString('en-GB') + '. ' + event.message
      };
      console.log(newMessage.body);
      if (this.messagesCollection.add(newMessage)) {
        const action = 'SENT';
        this.openSnackBar(event.message, action);
      }
    });
  }

  dateChanged(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.eventStart.setDate(event.value.getDate());
    this.eventStart.setMonth(event.value.getMonth());
    this.eventStart.setFullYear(event.value.getFullYear());
    this.eventDoc.update({ start: this.eventStart });
  }

  timeChanged(timeString: string): void {
    if (timeString === '') { return; }

    const time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
    if (time == null) { return null; }

    let hours = parseInt(time[1], 10);
    if (hours === 12 && !time[4]) {
      hours = 0;
    } else {
      hours += (hours < 12 && time[4]) ? 12 : 0;
    }
    this.eventStart.setHours(hours);
    this.eventStart.setMinutes(parseInt(time[3], 10) || 0);
    this.eventStart.setSeconds(0, 0);
    this.eventDoc.update({ start: this.eventStart });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
