import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../model/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private collection: AngularFirestoreCollection<Event>;
  recurringEvents: Observable<Event[]>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Event>('events');
    this.recurringEvents = this.collection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Event;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  ngOnInit() {
  }

}
