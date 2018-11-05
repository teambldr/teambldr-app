import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  eventStart: Date;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventDoc = this.afs.doc<Event>('events/' + id);
    this.event = this.eventDoc.valueChanges();
    this.event.subscribe(e => {
      this.eventStart = e.start.toDate();
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

}
