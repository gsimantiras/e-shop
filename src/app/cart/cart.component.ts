import { Router } from "@angular/router";
import { Product } from "./../../classes/classes";
import { inject } from "@angular/core/testing";
import { NotificationsService } from "angular2-notifications";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  public qrCode: string = null;
  itemsObs: Observable<any[]>;
  items = new Array();
  public qrVisible = true;
  public showLoader = true;
  public hasItems = false;
  public navLink: string;
  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    var that = this;
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(["/login"]);
    }
    this.itemsObs = this.getItems("/cart");
    this.itemsObs.subscribe(() => {
      this.showLoader = false;
      this.hasItems = false;
    });

    this.itemsObs.forEach(element => {
      this.items.push(
        element.map((productData: any) => {
          if (element.length > 0) {
            this.hasItems = true;
          }
          return new Product(
            productData.itemId,
            productData.title,
            productData.price,
            productData.count,
            productData.description
          );
        })
      );
    });
  }

  ngOnInit() {
    // this.qrCode='http://www.nfc-transactions-app.com/data';
  }

  getItems(listPath): Observable<any[]> {
    var query = {
      orderByChild: "user",
      equalTo: this.auth.getUser().uid
    };
    return this.db
      .list(listPath + "/" + this.auth.getUser().uid)
      .valueChanges();
  }

  addToCart(item) {
    var res = this.auth.addToCart(item, item.count + 1);
  }

  removeFromCart(item) {
    var res = this.auth.addToCart(item, item.count - 1);
  }

  buy() {
    var data = {
      cart: "yes",
      user: this.auth.getUser().email,
      items: this.items
    };

    this.qrCode =
      "http://www.nfc-transactions-app.com/data?" + this.auth.getUser().uid;
    //  JSON.stringify(data);
    this.qrVisible = false;
  }

  goToDash() {
    this.router.navigate(["/dashboard"]);
  }
}
