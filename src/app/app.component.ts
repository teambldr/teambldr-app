import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AuthService } from './core/auth.service';
import { MessagingService } from './core/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'teamBldr';
  items: Observable<any[]>;
  message: any;

  constructor(db: AngularFirestore, private messagingService: MessagingService, public authService: AuthService) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  logout() {
    this.authService.logout();
  }
}
