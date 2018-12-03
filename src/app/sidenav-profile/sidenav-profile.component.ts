import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.css']
})
export class SidenavProfileComponent implements OnInit {
  displayName: String;
  email: String;
  photoURL: String;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
    });
  }
}
