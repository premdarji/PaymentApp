import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import {MaterialModule} from '../material/material.module';
import {RegisterComponent} from '../register/register.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import { from } from 'rxjs';
import { DetailComponent } from './detail/detail.component';
import { BuyComponent } from './buy/buy.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MyorderComponent } from './myorder/myorder.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { MywalletComponent } from './mywallet/mywallet.component';

import { MatNativeDateModule } from '@angular/material/core';
import { WishlistComponent } from './wishlist/wishlist.component';


// import { StoreModule } from "@ngrx/store";
// import * as fromProduct from "../Common/Reducer/Product.reducer";
// import { EffectsModule } from '@ngrx/effects';
// import { ProductEffects } from '../Common/Effects/Products.effects';



@NgModule({
  declarations: [
  DashboardComponent,
  HomeComponent,
  DetailComponent,
  BuyComponent,
  CartComponent,
  CheckoutComponent,
  MyorderComponent,
  CancelOrderComponent,
  MywalletComponent,
  WishlistComponent,
 
],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,

    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,

    ScrollingModule,
    MatNativeDateModule

 
    // StoreModule.forFeature('myproduct', fromProduct.reducer),
   
    // EffectsModule.forFeature([ProductEffects])
    
  ],
  providers:[RegisterComponent,DatePipe,MatNativeDateModule],
  entryComponents:[CancelOrderComponent]

})
export class HomeModule { }
