import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminMenuItemService } from '../admin-menu-item.service';
import { MenuItem } from '../models/menuItem';
import { Menu } from '../models/menu';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { OrderCartService } from '../order-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  menuCategory: Menu[] = [];
  subscription: Subscription;
  menu: string;
  cart: any;

  constructor(
    route: ActivatedRoute,
    private amService: AdminMenuItemService,
    private ordeCartService: OrderCartService) {  
    this.amService.getAll().subscribe((items: any) => {
      this.items = items;
    });
    amService.getMenu().pipe(
    switchMap((menuCategory: any) => {
      this.menuCategory = menuCategory;
      return route.queryParamMap;
    }))
      .subscribe(params => {
        this.menu = params.get('menu');
  
        this.filteredItems = (this.menu) ?
          this.items.filter( m => m.menuCategory === this.menu ) :
          this.items;
      });
   }

  async ngOnInit() {
    this.subscription = (await this.ordeCartService.getCart()).snapshotChanges().subscribe(c => {
      this.cart = c.payload.val();
      // console.log(this.cart);
    });   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
