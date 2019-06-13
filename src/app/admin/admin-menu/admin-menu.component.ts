import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminMenuItemService } from 'src/app/admin-menu-item.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/models/menuItem';
// import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit, OnDestroy {
  menus: MenuItem[];
  filteredMenus: any[];
  subscription: Subscription;
  // tableRsource: DataTableResource<Menu>;
  items: MenuItem[] = [];
  itemCount: number;

  constructor(private amService: AdminMenuItemService) { 
    this.subscription = this.amService.getAll()
    .subscribe((menus: any) => {
      this.filteredMenus = this.menus = menus;
      // this.initializeTable(menus);
    });
  }

  search(item: string){
    this.filteredMenus = (item) ?
      this.menus.filter(m => m.title.toLowerCase().includes(item.toLowerCase())) :
      this.menus;
  }

  // private initializeTable(menus: Menu[]){
  //   this.tableRsource = new DataTableResource(menus);
  //     this.tableRsource.query({ offset: 0 })
  //       .then(items => this.items = items);
  //     this.tableRsource.count()
  //       .then(count => this.itemCount = count);
  // }

  // reloadItems(params){
  //   if(!this.tableRsource) return;

  //   this.tableRsource.query(params)
  //     .then(items => this.items = items);
  // }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
