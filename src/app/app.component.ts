import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-Shop';
  currentYear: number;
  currentUser: string;
  public showLoader = true;

  constructor(
    public auth: AuthService
  ){
    if (this.auth.getUser() != null){
      this.currentUser = this.auth.getUser().email;
    }else{
      this.currentUser = 'Sign in'
    }
  }


  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    const classname = document.getElementsByClassName('nav-link');

    for (let i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', function() {
        // classname[i].className += ' active';
      }, false);
    }
  }

  userBtn(e){
    if (this.auth.getUser() != null){
      this.auth.signOut();
    }else{
      this.auth.router.navigate(['/login'])
    }
  }

  openMenu(){
    const menu = document.getElementById('navbarSupportedContent');
    if (menu.classList.contains('collapse')){
      menu.className = 'navbar-collapse ml-auto' ;
    } else{
      menu.className = 'collapse navbar-collapse ml-auto' ;
    }
  }
}
