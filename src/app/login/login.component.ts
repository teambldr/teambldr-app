import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginFacebook() {
    this.authService.loginWithFacebook().then(() => this.router.navigate(['home']));
  }

  loginGoogle() {
    this.authService.loginWithGoogle().then(() => this.router.navigate(['home']));
  }
}
