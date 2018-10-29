import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecurringEvent } from '../model/recurring-event';
import { Event } from '../model/event';
import { User } from '../model/user';

@Component({
  selector: 'app-recurring-event',
  templateUrl: './recurring-event.component.html',
  styleUrls: ['./recurring-event.component.css']
})
export class RecurringEventComponent implements OnInit {
  private id: string;
  eventDoc: AngularFirestoreDocument<RecurringEvent>;
  event: Observable<RecurringEvent>;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  private newEventCollection: AngularFirestoreCollection<Event>;
  inviteLink: string;

  constructor(private afs: AngularFirestore, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inviteLink = environment.baseUrl + 'join/' + this.id;
    this.eventDoc = this.afs.doc<RecurringEvent>('recurringEvents/' + this.id);
    this.event = this.eventDoc.valueChanges();
    this.usersCollection = this.afs.collection<User>('recurringEvents/' + this.id + '/users');
    this.users = this.usersCollection.valueChanges();
    this.newEventCollection = this.afs.collection<Event>('events/');
  }

  createNewEvent() {
    this.eventDoc.ref.get().then(template => {
      const newEvent: Event = {
        templateId: this.id,
        name: template.data().name,
        date: new Date(),
        time: '',
        message: 'Are you in?'
      };
      this.newEventCollection.add(newEvent).then(doc =>
        this.router.navigate(['event/' + doc.id]));
    });
  }

  copyInputText(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
