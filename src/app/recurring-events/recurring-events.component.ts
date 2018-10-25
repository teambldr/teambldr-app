import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface RecurringEvent { name: string; }

@Component({
  selector: 'app-recurring-events',
  templateUrl: './recurring-events.component.html',
  styleUrls: ['./recurring-events.component.css']
})
export class RecurringEventsComponent implements OnInit {

  private collection: AngularFirestoreCollection<RecurringEvent>;
  recurringEvents: Observable<RecurringEvent[]>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<RecurringEvent>('recurringEvents');
    this.recurringEvents = this.collection.valueChanges();
  }

  ngOnInit() {
  }

  addEvent(event: RecurringEvent) {
    console.log('add');
  }
}
