import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
// import { DataTableModule } from 'angular-4-data-table';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { MenuDirective } from './admin/menu.directive';
import { AdminMenuDirective } from './admin/admin-menu.directive';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminMenuItemComponent } from './admin/admin-menu-item/admin-menu-item.component';
import { SpecialComponent } from './special/special.component';
import { AdminCheckoutComponent } from './admin/admin-checkout/admin-checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminMenuItemService } from './admin-menu-item.service';
import { ItemCardComponent } from './item-card/item-card.component';
import { MenuFilterComponent } from './menu-filter/menu-filter.component';
import { OrderCartService } from './order-cart.service';
import { ItemsCarouselComponent } from './items-carousel/items-carousel.component';
import { SingUpComponent } from './sing-up/sing-up.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    MyOrderComponent,
    CheckOutComponent,
    HomeComponent,
    MenuComponent,
    MenuItemComponent,
    AdminOrderComponent,
    MenuDirective,
    AdminMenuDirective,
    AdminMenuComponent,
    AdminMenuItemComponent,
    SpecialComponent,
    AdminCheckoutComponent,
    PageNotFoundComponent,
    NavBarComponent,
    ItemCardComponent,
    MenuFilterComponent,
    ItemsCarouselComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // DataTableModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'menu-item', component: MenuItemComponent },
      { path: 'special', component: SpecialComponent},

      { path: 'sing-up', component: SingUpComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },

      { path: 'my-order', component: MyOrderComponent },

      { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard] },
      
      

      { 
        path: 'admin/order', 
        component: AdminOrderComponent, canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/checkout', 
        component: AdminCheckoutComponent, canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/menu', 
        component: AdminMenuComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] },
      { 
        path: 'admin/menu/items/new', 
        component: AdminMenuItemComponent, canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/menu/items/:id', 
        component: AdminMenuItemComponent, canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/menu/items', 
        component: AdminMenuItemComponent, canActivate: [AuthGuard, AdminAuthGuard] 
      },

      { path: '**', component: PageNotFoundComponent },
    ])
  ],
  providers: [
    AngularFireAuthModule,
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    AdminMenuItemService,
    OrderCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
