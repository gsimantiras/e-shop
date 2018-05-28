import { AuthService } from './../services/auth.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  constructor(
    private auth:  AuthService
  ) {

  }

  ngOnInit() {
  }

  public signIn(e) {
    this.auth.signInWithEmail(this.username, this.password)
  }

}
