import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  MatSidenavModule,
  MatProgressBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MessagingService } from './core/messaging.service';
import { RecurringEventsComponent } from './recurring-events/recurring-events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { RecurringEventComponent } from './recurring-event/recurring-event.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { JoinComponent } from './join/join.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recurring', component: RecurringEventsComponent, canActivate: [AuthService] },
  { path: 'recurringEvent/:id', component: RecurringEventComponent, canActivate: [AuthService] },
  { path: 'events', component: EventsComponent, canActivate: [AuthService] },
  { path: 'event', component: EventComponent, canActivate: [AuthService] },
  { path: 'event/:id', component: EventComponent, canActivate: [AuthService] },
  { path: 'join/:id', component: JoinComponent },
  { path: '**', component: HomeComponent, canActivate: [AuthService] }
];

@NgModule({
  declarations: [
    AppComponent,
    RecurringEventsComponent,
    HomeComponent,
    LoginComponent,
    RecurringEventComponent,
    EventsComponent,
    EventComponent,
    JoinComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
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
    MatSidenavModule,
    MatProgressBarModule
  ],
  providers: [
    AuthService,
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
