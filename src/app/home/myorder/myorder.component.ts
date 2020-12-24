import { Component, OnInit } from '@angular/core';

import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/product.service';
import { HomeComponent } from '../home.component';

import { Store,select } from '@ngrx/store';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";



@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  constructor(private orders:OrderService,
    private home:HomeComponent,
    private store:Store<ProductState>) { }

  commondata:any;

  Products:any;

  ngOnInit(): void {

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      }
    })

   this.GetOrders();
    

  }

  GetOrders(){
    // this.orders.GetAll().subscribe(res=>{
    //   this.home.GetCount();
    //   console.log(res);
    //   this.Products=res;
    // })

    this.store.dispatch(new fromActions.GetOrderList());

    this.store.pipe(select(selector.OrderList)).subscribe((result: any) => {
      if (result) {
      this.Products = result;
      console.log(this.Products)
      }
    })
  }
}
