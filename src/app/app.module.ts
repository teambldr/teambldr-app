import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MessagingService } from './shared/messaging.service';
import { RecurringEventsComponent } from './recurring-events/recurring-events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recurring', component: RecurringEventsComponent, canActivate: [AuthService] },
  { path: '**', component: HomeComponent, canActivate: [AuthService] }
];

@NgModule({
  declarations: [
    AppComponent,
    RecurringEventsComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [
    AuthService,
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
