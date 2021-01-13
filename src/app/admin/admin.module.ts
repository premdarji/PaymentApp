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

import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [DashboardComponent, ProductComponent, MainComponent, CategoryComponent, AddcategoryComponent, CouponsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule
  ],
  entryComponents:[DashboardComponent],
  providers:[DashboardComponent,MatNativeDateModule]
})
export class AdminModule { }
