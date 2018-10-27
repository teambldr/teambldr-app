import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecurringEvent } from '../model/recurring-event';

@Component({
  selector: 'app-recurring-events',
  templateUrl: './recurring-events.component.html',
  styleUrls: ['./recurring-events.component.css']
})
export class RecurringEventsComponent implements OnInit {

  private collection: AngularFirestoreCollection<RecurringEvent>;
  recurringEvents: Observable<RecurringEvent[]>;

  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection<RecurringEvent>('recurringEvents');
    this.recurringEvents = this.collection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as RecurringEvent;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  ngOnInit() {
  }

}
