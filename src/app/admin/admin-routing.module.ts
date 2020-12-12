import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';

import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
      {path:"",component:MainComponent,
        children:[
          {path:'',component:DashboardComponent},
          {path:'product',component:ProductComponent},
          {path:'dashboard',component:DashboardComponent},
          {path:'category',component:CategoryComponent}
        ]
    
    
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
