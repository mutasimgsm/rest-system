import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminMenuItemService } from 'src/app/admin-menu-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-admin-menu-item',
  templateUrl: './admin-menu-item.component.html',
  styleUrls: ['./admin-menu-item.component.css']
})
export class AdminMenuItemComponent implements OnInit, OnDestroy {
  menus$: Menu[] = [];
  objectKeys = Object.keys;
  subscription: Subscription;
  item: MenuItem[] = [];
  id;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private amItemServise: AdminMenuItemService) { 

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id){

        this.amItemServise.getItem(this.id).subscribe((item: any) => {
          this.item = item;
          // console.log(this.item);
        });
      } 
  }

   ngOnInit(){
     this.amItemServise.getMenu().subscribe((menus: any) => {
       this.menus$ = menus;
     });
   }

   ngOnDestroy(){
   }
 
  save(item) {
    if (this.id) this.amItemServise.update(this.id, item);
    else this.amItemServise.create(item);

    this.router.navigate(['/admin/menu']);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this item?")) return false;

    this.amItemServise.delete(this.id);
    this.router.navigate(['/admin/menu']);
  }

}
