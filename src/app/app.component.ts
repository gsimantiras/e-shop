import { AuthService } from "./services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "E-Shop";
  currentYear: number;
  currentUser: string;
  public showLoader = true;

  constructor(public auth: AuthService) {
    if (this.auth.getUser() != null) {
      this.currentUser = this.auth.getUser().email;
    } else {
      this.currentUser = "Sign in";
    }
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    const classname = document.getElementsByClassName("btn nav-link");
    const self = this;
    for (let i = 0; i < classname.length; i++) {
      classname[i].className = "btn nav-link";
      classname[i].addEventListener(
        "click",
        function() {
          const classnames = document.getElementsByClassName("btn nav-link");
          for (let y = 0; y < classnames.length; y++) {
            if(classname[y].className.indexOf('btn-red') > 0){
              classnames[y].className = "btn nav-link btn-red";
            }else if (classname[y].className.indexOf('btn-blue')> 0){
              classnames[y].className = "btn nav-link btn-blue";
            }else{
              classnames[y].className = "btn nav-link";
            }
          }
          self.openMenu()
          classname[i].className += " active";
        },
        false
      );
    }
  }

  userBtn(e) {
    if (this.auth.getUser() != null) {
      this.auth.signOut();
    } else {
      this.auth.router.navigate(["/login"]);
    }
  }

  public openMenu = () => {
    const menu = document.getElementById("navbarSupportedContent");
    if (menu.classList.contains("collapse")) {
      menu.className = "navbar-collapse ml-auto";
    } else {
      menu.className = "collapse navbar-collapse ml-auto";
    }
  }
}
