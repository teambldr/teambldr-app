import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faFacebookF = faFacebookF;
  faGoogle = faGoogle;
  faSignInAlt = faSignInAlt;

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
