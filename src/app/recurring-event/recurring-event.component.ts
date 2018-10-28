import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecurringEvent } from '../model/recurring-event';
import { User } from '../model/user';

@Component({
  selector: 'app-recurring-event',
  templateUrl: './recurring-event.component.html',
  styleUrls: ['./recurring-event.component.css']
})
export class RecurringEventComponent implements OnInit {

  private eventDoc: AngularFirestoreDocument<RecurringEvent>;
  event: Observable<RecurringEvent>;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventDoc = this.afs.doc<RecurringEvent>('recurringEvents/' + id);
    this.event = this.eventDoc.valueChanges();
    this.usersCollection = this.afs.collection<User>('recurringEvents/' + id + '/users');
    this.users = this.usersCollection.valueChanges();
  }

  update(item: RecurringEvent) {
    this.eventDoc.update(item);
  }

}
