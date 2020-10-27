import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { MyorderComponent } from './myorder/myorder.component'



@NgModule({
  declarations: [
  DashboardComponent,
  HomeComponent,
  DetailComponent,
  BuyComponent,
  CartComponent,
  CheckoutComponent,
  MyorderComponent,
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

    ScrollingModule
    
  ],
  providers:[RegisterComponent]

})
export class HomeModule { }
