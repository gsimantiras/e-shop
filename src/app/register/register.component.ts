import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username:string;
  password:string;
  passwordConf:string;

  constructor(
    private auth:AuthService
  ) {

  }

  ngOnInit() {
  }

  signUp(){
    this.auth.signUpWithEmail(this.username, this.password);
  }
}
