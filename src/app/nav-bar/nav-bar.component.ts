import { Component, OnInit, DoCheck, OnChanges, AfterContentInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { app } from 'firebase';
import { OrderCartService } from '../order-cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, DoCheck, OnChanges, AfterContentInit {
  appUser: AppUser;
  appAlluser;
  itemCartItemCount: number;
  userName: any;
  returnedUser: any;
  result: any;

  constructor(
    private auth: AuthService,
    private orderCartService: OrderCartService) { 
  }

  logout() {
    this.auth.logout();
    this.auth.logOutUser();
  }

  ngOnChanges() {
    
  }
  ngDoCheck() {
    if(this.appUser) {
      this.appAlluser = this.appUser;
    } else if (this.result) {
      this.appAlluser = this.result;
    }
    this.appAlluser = (this.result) ? this.result : this.appUser;
    console.log('common ', this.appAlluser);
  }

  ngAfterContentInit() {
   
  }

  async ngOnInit() {
    // this.result;
    this.auth.getLogedinUser().valueChanges().subscribe(user => this.result = user);
    // if(this.result) {
      // result.subscribe(appUser => this.returnedUser = appUser);
    // console.log('in nav-bar ', this.result);
    // }

    this.auth.appUser$.subscribe(user => this.appUser = user);
    
    // this.appAlluser = (this.appUser) ? this.appUser : this.result;
    // console.log('common ', this.appAlluser);

    let cart$ = await this.orderCartService.getCart();
    cart$.snapshotChanges().subscribe(carts => {
      let cart = carts.payload.val();
      if(!cart) return;

      this.itemCartItemCount = 0;
      for (let itemId in cart.items)
        this.itemCartItemCount += cart.items[itemId].quantity;
    });

  }

}
