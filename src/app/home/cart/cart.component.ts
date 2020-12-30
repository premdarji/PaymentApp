import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';

import { ConfirmComponent, ConfirmDialogModel } from 'src/app/confirm/confirm.component';
import { NotificationService } from 'src/app/shared/notification.service';

import { ProductService } from 'src/app/shared/product.service';
import { HomeComponent } from '../home.component';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service:ProductService,
    private productservice:ProductService,
    public dialog: MatDialog,
    private home:HomeComponent,
    private router:Router,
    private notification:NotificationService ,
    private store:Store<ProductState>
    ) { }

  cartItems:any;

  temp:any;
  showComponent=false;
  total:number=0;
  ids=[];
  empty=true;
  buy:boolean;
  counter:number=0;
  commondata:any;

  
  ngOnInit(): void {
  
    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      }
    })

    this.home.GetCount();
    this.store.dispatch(new fromActions.GetCartList());
    this.loadCart();
  }

  loadCart(){
    this.store.pipe(select(selector.GetCartItems)).subscribe((result: any) => {
      if (result) {
        this.cartItems=result;
        if(this.cartItems.length>0){
          this.showComponent=true;
        }
       this.cartTotal();
       this.home.GetCount();
      }
    })
  }

  removeFromCart(id,index){

    if(this.cartItems[index].quantity>1){
      this.cartItems[index].quantity=this.cartItems[index].quantity-1;
      this.total-=this.cartItems[index].price;
      this.store.dispatch(new fromActions.UpdateCart(this.cartItems,id,this.cartItems[index].quantity));    
    }
    else{
      
        const message = `Are you sure you want remove this product?`;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef=this.dialog.open(ConfirmComponent, {
          maxWidth: "400px",
          data: dialogData
        });
    
         dialogRef.afterClosed().subscribe(dialogResult => {
             if(dialogResult==true){
               this.total-=this.cartItems[index].price;
               this.home.GetCount();
               this.store.dispatch(new fromActions.RemoveFromCart(id));
               this.loadCart();
               this.notification.Delete("Item is removed from cart"); 
             }
         });
    }
  
  }
  addToCart(id,index){

    if(this.cartItems[index].stock>this.cartItems[index].quantity){
      this.cartItems[index].quantity=this.cartItems[index].quantity+1;
      this.total+=this.cartItems[index].price;
      this.store.dispatch(new fromActions.UpdateCart(this.cartItems,id,this.cartItems[index].quantity));
    }
    else{
      this.notification.Delete("out of stock")
    }

   

  }

  cartTotal(){
    this.total=0;
    this.cartItems.forEach(element => {
  
      this.total += (element.quantity*element.price)
    });

   
  }

  placeOrder(){
    if(this.cartItems.length==0){
      this.notification.Delete("Cart is empty,please add item in your cart");
    }
    else{
      this.router.navigate(["home/checkout"])
    }

  }


  delete(id){
    this.store.dispatch(new fromActions.RemoveFromCart(id));
    this.notification.Delete("Item removed form cart");
   
  }
}
