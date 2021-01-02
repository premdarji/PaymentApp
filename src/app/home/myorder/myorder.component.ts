import { Component, OnInit } from '@angular/core';

import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/product.service';
import { HomeComponent } from '../home.component';

import { Store,select } from '@ngrx/store';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CancelOrderComponent } from '../cancel-order/cancel-order.component';



@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  constructor(private orders:OrderService,
    private home:HomeComponent,
    private store:Store<ProductState>,
    private dialog:MatDialog) { }

  commondata:any;

  Products:any;

  ngOnInit(): void {

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      }
    })

   this.getOrders();
    

  }

  getOrders(){
  
    this.store.dispatch(new fromActions.GetOrderList());

    this.store.pipe(select(selector.OrderList)).subscribe((result: any) => {
      if (result) {
      this.Products = result;
 
      }
    })
  }

  cancelOrder(id){
   
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="40%";
    dialogconfig.data=id;
    this.dialog.open(CancelOrderComponent,dialogconfig);
  }
}
