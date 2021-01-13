import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';


import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';

import { MainComponent } from './main/main.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CouponsComponent } from './coupons/coupons.component';


@NgModule({
  declarations: [DashboardComponent, ProductComponent, MainComponent, CategoryComponent, AddcategoryComponent, CouponsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[DashboardComponent],
  providers:[DashboardComponent]
})
export class AdminModule { }
