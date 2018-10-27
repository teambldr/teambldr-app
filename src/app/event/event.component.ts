import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventDoc = this.afs.doc<Event>('events/' + id);
    this.event = this.eventDoc.valueChanges();
  }

}
