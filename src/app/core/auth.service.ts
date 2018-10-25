import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, database } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  auth: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) {     
    this.auth = afAuth.authState.subscribe( user => {
      if (user) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  get isAuthenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  get currentUser(): any {
    return this.isAuthenticated ? this.afAuth.authState : null;
  }

  loginWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth
        .signInWithPopup(new auth.FacebookAuthProvider())
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  loginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData(): void {
    const path = `users/${this.currentUser.currentUserId}`; // Endpoint on firebase
    const data = {
      name: this.currentUser.displayName,
      email: this.currentUser.email,
    };

    // this.database.object(path).update(data).catch(error => console.log(error));
  }
}
