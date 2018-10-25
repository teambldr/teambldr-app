import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecurringEvent } from '../model/recurring-event';

@Component({
  selector: 'app-recurring-event',
  templateUrl: './recurring-event.component.html',
  styleUrls: ['./recurring-event.component.css']
})
export class RecurringEventComponent implements OnInit {

  private eventDoc: AngularFirestoreDocument<RecurringEvent>;
  event: Observable<RecurringEvent>;
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventDoc = this.afs.doc<RecurringEvent>('recurringEvents/' + id);
    this.event = this.eventDoc.valueChanges();
  }

  update(item: RecurringEvent) {
    this.eventDoc.update(item);
  }

}
