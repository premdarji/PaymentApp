import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';

import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { CouponsComponent } from './coupons/coupons.component';

const routes: Routes = [
      {path:"",component:MainComponent,
        children:[
          {path:'',component:DashboardComponent},
          {path:'product',component:ProductComponent},
          {path:'dashboard',component:DashboardComponent},
          {path:'category',component:CategoryComponent},
          {path:'coupon',component:CouponsComponent}
        ]
    
    
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
