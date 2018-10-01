import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../classes/classes';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()
  item: Product;

  constructor(private auth: AuthService,
    ) { }

  ngOnInit() {
  }


  addToCart(item) {
    if(item.quantity>0){
      var res = this.auth.addToCart(item, 1);
    }
  }
}
