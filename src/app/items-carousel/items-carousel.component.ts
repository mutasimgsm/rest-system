import { Component, OnInit, Input } from '@angular/core';
import { OrderCartService } from '../order-cart.service';
import { AdminMenuItemService } from '../admin-menu-item.service';
import { MenuItem } from '../models/menuItem';

@Component({
  selector: 'items-carousel',
  templateUrl: './items-carousel.component.html',
  styleUrls: ['./items-carousel.component.css']
})
export class ItemsCarouselComponent implements OnInit {
  @Input('menu-category') menuCategory;
  items: MenuItem[] = [];

  constructor(private amItemService: AdminMenuItemService) {

    console.log(this.menuCategory);
    this.amItemService.getAll().subscribe((item: any)=> {
      this.items = item.filter(m => m.menuCategory === this.menuCategory);
      console.log(this.items);
    });
   }

  ngOnInit() {
  }

}
