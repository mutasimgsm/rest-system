import { Component, OnInit } from '@angular/core';
import { OrderCartService } from '../order-cart.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  cart;
  itemCartItemCount: number;
  totalPrice: number;
  quantity: number;

  constructor(private orderCartService: OrderCartService) { }

  async ngOnInit() {
    let cart$ = await this.orderCartService.getCart();
    cart$.snapshotChanges().subscribe(carts => {
      let cart = carts.payload.val();
      if(!cart) return;     // null checking

      // clear feilds
      this.itemCartItemCount = 0;
      this.totalPrice = 0;
      this.quantity = 0;
      this.cart = [];

      for (let itemId in cart.items) {
        this.quantity = cart.items[itemId].quantity;
        let price = cart.items[itemId].price;

        let itemMap = {
          key: itemId
        }
        Object.assign( itemMap, ...cart.items[itemId]);

        this.cart.push(itemMap);
        this.itemCartItemCount += this.quantity;
        this.totalPrice += (this.quantity * price);
      }
    });
  }

  addToCart(item){
    this.orderCartService.addToCart(item);
  }

  removeFromCart(item){
    this.orderCartService.removeFromCart(item);
  }

  clearCart(){
    this.orderCartService.clearCart();
  }

}
