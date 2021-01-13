import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../authentication.guard';
import { RegisterComponent } from '../register/register.component';
import { BuyComponent } from './buy/buy.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home.component';
import { MyorderComponent } from './myorder/myorder.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
     children:[
           { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
           {path:'dashboard',component:DashboardComponent},
           {path:'register',component:RegisterComponent},
           {path:'detail/:id',component:DetailComponent},
           {path:'buy/:id',component:BuyComponent},
           {path:'cart',component:CartComponent},
           {path:'checkout',component:CheckoutComponent},
           {path:'order',component:MyorderComponent},
           {path:"cancel",component:CancelOrderComponent},
           {path:"wishlist",component:WishlistComponent}
  
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
