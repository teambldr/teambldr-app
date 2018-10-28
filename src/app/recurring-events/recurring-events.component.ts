import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { RecurringEvent } from '../model/recurring-event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurring-events',
  templateUrl: './recurring-events.component.html',
  styleUrls: ['./recurring-events.component.css']
})
export class RecurringEventsComponent implements OnInit {

  private collection: AngularFirestoreCollection<RecurringEvent>;
  recurringEvents: Observable<RecurringEvent[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.collection = this.afs.collection<RecurringEvent>('recurringEvents');
    this.recurringEvents = this.collection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as RecurringEvent;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addNewEvent() {
    const newEvent: RecurringEvent = {
      name: '',
      description: '',
      location: '',
      organiser: ''
    };
    this.authService.currentUser.subscribe(user => {
      newEvent.organiser = user.displayName;
      this.collection.add(newEvent).then(doc =>
        this.router.navigate(['recurringEvent/' + doc.id]));
    });
  }
}
