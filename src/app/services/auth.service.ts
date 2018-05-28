import { NotificationsService } from 'angular2-notifications';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from 'angular-2-local-storage';
import { forEach } from '@angular/router/src/utils/collection';




@Injectable()
export class AuthService {
  private user: firebase.User = null;
  private userObs: Observable<firebase.User>

  constructor(
    private db: AngularFireDatabase,
    private _firebaseAuth: AngularFireAuth,
    public router: Router,
    private local: LocalStorageService,
    private notificationsService: NotificationsService
  ) {
    this.user = this.local.get('user');
    if(this.user != null){
      this.userObs = _firebaseAuth.authState;
    }

  }

  public signInWithEmail(email: string, password: string)  {
    this._firebaseAuth.auth.signInWithEmailAndPassword(email,  password).
    then((authState) => {
      this.setUser(authState);
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      alert(error.message);
    });
  }

  public signOut(){
    this._firebaseAuth.auth.signOut().then(success =>{
      this.user = null;
      this.local.remove('user');
      this.router.navigate(['/landing'])
    });
  }

  public signUpWithEmail(email:string, password:string){
    this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(success => {
      this.signInWithEmail(email, password);
      this.getUser().sendEmailVerification();
    })
    .catch(error => {
      alert(error.message);
    });
  }

  isLoggedIn() {
    if (this.user == null) {
      return false;
    }
    return true;
  }

  public getUser(){
    return this.user;
  }

  public getCart(){
    return this.cart;
  }
  private cart: Observable<{}[]>;

  public addToCart(item: any, count) {
    if (this._firebaseAuth.auth.currentUser == null) {
      this.router.navigate(['/login']);
      return;
    }
    var itemRef = this.db.object('/cart/' + this._firebaseAuth.auth.currentUser.uid+ '/' + item.itemId);

    if(count === 0){
      itemRef.remove();
      return;
    }

    const itemModel = {
      itemId: item.itemId,
      title: item.title,
      price: item.price,
      count: count,
      description: item.description
    }

    itemRef.update(itemModel).then(success=>{
      this.notificationsService.success('Cart', 'Item Added to your cart');
    }, reject =>{
      this.notificationsService.error('Cart', 'Action rejected.');
    })
    .catch(error => {
      this.notificationsService.error('Cart', error);
    });

  }

  public setUser(_user: firebase.User){
    this.user = _user;
    this.setItem('user', this.user);
  }

  public setItem(key:string, value:any){
    this.local.set(key,value);
  }

  public getItem(key:string){
    this.local.get(key);
  }
  public removeAll(key:string){
    this.local.remove(key);
  }

}


