import { Component, Input } from '@angular/core';
import { MenuItem } from '../models/menuItem';
import { OrderCartService } from '../order-cart.service';
import { isUndefined } from 'util';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  @Input('item') item: MenuItem;
  @Input('show-actions') showActions = true;
  @Input('order-cart') orderCart;

  constructor(private cartService: OrderCartService) { }

  addToOrder() {
    this.cartService.addToCart(this.item);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.item);
  }

  getQuantity() {
    if (!this.orderCart) return 0;

    let item = this.orderCart.items[this.item.key];
    return item ? item.quantity : 0;
  }

}
