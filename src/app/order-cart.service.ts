import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { MenuItem } from './models/menuItem';
import { take, map } from 'rxjs/operators';
import { FirebaseDatabase } from 'angularfire2';
import { OrderCart } from './models/order-cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrderCartService {

  constructor(
    private router: Router,
    private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/order-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<any> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/order-carts/' + cartId);
  }

  private getItem(cartId: string, itemId: string) {
    return this.db.object('/order-carts/' + cartId + '/items/' + itemId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(item: MenuItem) {
    this.updateItemQuantity(item, 1);
  }

  async removeFromCart(item: MenuItem){
    this.updateItemQuantity(item, -1);
  }

  clearCart(){
    let alert = confirm("Do you really want to clear all items?");
    if(!alert) return -1;

    this.db.object('/order-carts').remove();
    window.location.reload();
    
  }

  private async updateItemQuantity(item: MenuItem, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, item.key);
      item$.snapshotChanges().pipe(take(1)).subscribe(i => {
        let quantity = (i.payload.child('quantity').val() || 0) + change;
        item$.update({
          title: item.title,
          description: item.description,
          menuCategory: item.menuCategory,
          price: item.price,
          label: item.label,
          imageUrl: item.imageUrl,
           quantity: quantity
           });
           if (quantity === 0) item$.remove();
      });
     
  }

}
