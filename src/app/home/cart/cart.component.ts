import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ConfirmComponent, ConfirmDialogModel } from 'src/app/confirm/confirm.component';
import { NotificationService } from 'src/app/shared/notification.service';

import { ProductService } from 'src/app/shared/product.service';
import { HomeComponent } from '../home.component';

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
    private notification:NotificationService 
    ) { }

  cartItems:any;

  temp:any;
  showComponent=false;
  total:number=0;
  ids=[];
  empty=true;
  
 
  ngOnInit(): void {
   this.GetCartItems();
   this.home.GetCount();
  }

  GetCartItems(){
    this.service.GetCartItems().subscribe(res=>{
      
      this.cartItems=res;
     this.showComponent = true;
     if(this.cartItems!=null){
       this.empty=false;
     }
      console.log(this.cartItems)
      this.CartTotal();
      
     })
  }

  Remove(id,index){

    if(this.cartItems[index].quantity>1){
      this.productservice.UpdateCart(id,this.cartItems[index].quantity-1).subscribe(res=>{
        this.cartItems[index].quantity=this.cartItems[index].quantity-1;
        this.total -= this.cartItems[index].price;
      })
     
    }
    else{
      
        const message = `Are you sure you want remove this product?`;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef=this.dialog.open(ConfirmComponent, {
          maxWidth: "400px",
          data: dialogData
        });
    
         dialogRef.afterClosed().subscribe(dialogResult => {
        
             console.log(dialogResult)
             if(dialogResult==true){
               this.productservice.RemoveFormCart(this.cartItems[index].cartId).subscribe(res=>{
                debugger;
                this.total -= this.cartItems[index].price;
                this.home.GetCount();
                 console.log(res);
                this.GetCartItems();
                this.notification.Delete("Item is removed from cart");
                  
               })
             }
         });
    }
  
  }
  Add(id,index){

    this.productservice.UpdateCart(id,this.cartItems[index].quantity+1).subscribe(res=>{
      this.cartItems[index].quantity=this.cartItems[index].quantity+1;
      this.total += this.cartItems[index].price;
      console.log(res);
    })

  }

  CartTotal(){
    this.total=0;
    this.cartItems.forEach(element => {
      this.total += (element.quantity*element.price)
    });
    console.log(this.total);
  }

  PlaceOrder(){
    if(this.cartItems.length==0){
      this.notification.Delete("Cart is empty,please add item in your cart");
    }
    else{
      this.router.navigate(["home/checkout"])
    }

  }


  delete(id){
    this.productservice.RemoveFormCart(id).subscribe(res=>{
      this.GetCartItems();
      this.home.GetCount();
      this.notification.Delete("Item removed form cart");
    })
  }
}
