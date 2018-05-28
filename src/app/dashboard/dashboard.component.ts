import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itemsObs: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private notificationsService: NotificationsService
  ) {

  }

  ngOnInit() {
    this.itemsObs = this.getItems('/items');
  }


  getItems(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }


  addToCart(item) {
    var res = this.auth.addToCart(item, 1);
  }
}


