import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { AdminMenuItemService } from '../admin-menu-item.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../models/menuItem';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit, DoCheck, OnDestroy {
  item: MenuItem[] = [];
  itemSubscription: Subscription;

  constructor(private amItemService: AdminMenuItemService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // let itemId = this.route.snapshot.queryParamMap.get('itemId');

    // this.amItemService.getItem(itemId).pipe(take(1)).subscribe((item: any)=> {
    //   this.item = item;
    // });
  }

  ngDoCheck(){
    let itemId = this.route.snapshot.queryParamMap.get('itemId');

    this.itemSubscription = this.amItemService.getItem(itemId).pipe(take(1)).subscribe((item: any)=> {
      this.item = item;
    });
  }

  ngOnDestroy(){
    this.itemSubscription.unsubscribe();
  }

}
