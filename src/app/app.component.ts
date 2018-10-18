import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { MessagingService } from './shared/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'teamBldr';
  items: Observable<any[]>;
  message: any;

  constructor(db: AngularFirestore, private messagingService: MessagingService) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
