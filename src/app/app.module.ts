
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, enableProdMode } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';

import * as $ from 'jquery';
import {environment} from '../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LocalStorageModule } from 'angular-2-local-storage';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';

const appRoutes: Routes = [
  { path: 'main', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LandingComponent }
];
const notifOptions = {
  timeOut: 3000,
  showProgressBar: true,
  pauseOnHover: true,
  clickToClose: true
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFontAwesomeModule,
    SimpleNotificationsModule.forRoot(notifOptions),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    AngularFireModule.initializeApp( {
      apiKey: 'AIzaSyDYxsEKo1bcUTla_oVjsHNJdUvci0AtaGs',
      authDomain: 'e-shop-23fd2.firebaseapp.com',
      databaseURL: 'https://e-shop-23fd2.firebaseio.com',
      projectId: 'e-shop-23fd2',
      storageBucket: 'e-shop-23fd2.appspot.com',
      messagingSenderId: '708266166078'
    }, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    QRCodeModule,
    NgbModule.forRoot()
  ],
  exports:  [],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
