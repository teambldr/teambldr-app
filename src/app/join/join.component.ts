import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  private id: string;

  constructor(
    private readonly afs: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usersCollection = this.afs.collection<User>('recurringEvents/' + this.id + '/users');
    this.authService.currentUser.subscribe(user => { if (user) { this.joinUserToEvent(user); } });
  }

  joinUserToEvent(currentUser: firebase.UserInfo) {
    const user: User = {
      displayName: currentUser.displayName
    };
    this.usersCollection.doc(currentUser.uid).set(user);
    this.router.navigate(['recurringEvent/' + this.id]);
  }

  loginFacebook() {
    this.authService.loginWithFacebook();
  }

  loginGoogle() {
    this.authService.loginWithGoogle();
  }
}
