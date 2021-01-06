import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';

import { ConfirmComponent, ConfirmDialogModel } from 'src/app/confirm/confirm.component';
import { NotificationService } from 'src/app/shared/notification.service';

import { ProductService } from 'src/app/shared/product.service';
import { HomeComponent } from '../home.component';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { element } from 'protractor';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service:ProductService,
    private productservice:ProductService,
    public dialog: MatDialog,
  
    private router:Router,
    private notification:NotificationService ,
    private store:Store<ProductState>
    ) { }

  cartItems:any;

  temp:any[];
  showComponent=false;
  total:number=0;
  ids=[];
  empty=true;
  buy:boolean;
  counter:number=0;
  commondata:any;
  cartItemsAnnonymous=[];
  showAnnonymous=false;
  returnUrl:string;
  isLoggedIn:boolean=false;

  
  ngOnInit(): void {

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      }
    })


    if(this.checkLoginStatus()){
        
       this.store.dispatch(new fromActions.GetCartCount())
        this.store.dispatch(new fromActions.GetCartList());
        this.loadCart();
      
    }
    else{
  
      this.loadCartWithoutLogin();
     
    }
    
  }


  loadCartWithoutLogin(){
    let items=JSON.parse(sessionStorage.getItem("cart"))
    console.log(items);
    if(items.length>0){
      this.showAnnonymous=true;

      let cart={
        productId:0,
        name:'',
        price:0,
        imageUrl:'',
        quantity:1,
        description:'',
        stock:0
  
      }
  
  
      items.forEach(element => {
        this.store.dispatch(new fromActions.GetProductById(Number(element)))
  
        this.store.select(selector.GetProductById).subscribe((res:any)=>{
          // console.log(res)
           
           if(res!=null){
         
           cart.productId=res["productId"];
           cart.name=res["name"];
           cart.imageUrl=res["imageUrl"];
           cart.description=String(res["description"]);
           cart.price=res["price"];
           cart.stock=res["quantity"];
          
           console.log(cart)
           
           this.cartItemsAnnonymous.push(cart)
           this.cartTotal();
           }
         
         })
  
    
  
      });
       



    }
    else{
      this.showAnnonymous=false;
    }
  }




  loadCart(){
    this.store.pipe(select(selector.GetCartItems)).subscribe((result: any) => {
      if (result) {
        this.cartItems=result;
        if(this.cartItems.length>0){
          this.showComponent=true;
          this.showAnnonymous=false;
        }
       this.cartTotal();
       this.store.dispatch(new fromActions.GetCartCount());
   
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
               this.store.dispatch(new fromActions.GetCartCount())
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
    if(this.checkLoginStatus()){
     
      this.cartItems.forEach(element => {
    
        this.total += (element.quantity*element.price)
      }); 
    }
    else{
   
     this.cartItemsAnnonymous.forEach(element => {
      
       this.total+=(element.quantity*element.price)
     });
  
    }
   
  }

  
  placeOrder(){
    this.store.pipe(select(selector.IsLoggedIn)).subscribe(res=>{
      if(res==false){
        this.returnUrl="/home/checkout";
        this.login(this.returnUrl);
        this.notification.Delete("Login before checkout");
        
      }
      else{
        if(this.cartItems.length==0){
          this.notification.Delete("Cart is empty,please add item in your cart");
        }
        else{
          this.router.navigate(["home/checkout"])
        }

      }
    })
    
  }


  delete(id){
    this.store.dispatch(new fromActions.RemoveFromCart(id));
    this.notification.Delete("Item removed form cart");
   
  }

  login(returnUrl:string){

    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="40%";
    dialogconfig.data=returnUrl;
    this.dialog.open(LoginComponent,dialogconfig);

  }

  checkLoginStatus():boolean{
    this.store.dispatch(new fromActions.CheckLogInStatus());
    this.store.select(selector.IsLoggedIn).subscribe(res=>{
     this.isLoggedIn=res
    })
    if(this.isLoggedIn==true){
      return true;
    }

    return false;
  
  }

  removeAnnonymous(Id,Index){
    console.log("Product id is:"+Id)
    console.log(Index)
    if(this.cartItemsAnnonymous[Index]['quantity']>1){
      this.cartItemsAnnonymous[Index]['quantity']-=1;
      this.cartTotal();
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
              let items=[];
              items= JSON.parse(sessionStorage.getItem("cart"));
              var inde=items.indexOf(Id)
              items.splice(items.indexOf(Id),1);
              sessionStorage.setItem("cart",JSON.stringify(items))
              this.loadCartWithoutLogin();
           
             }
         });
  
    }
  }


  addAnnonymous(Id,Index){
    console.log("Product id is:"+Id)
    console.log(Index)
    if(this.cartItemsAnnonymous[Index]['quantity']<this.cartItemsAnnonymous[Index]['stock']){
      this.cartItemsAnnonymous[Index]['quantity']+=1;
      this.cartTotal();
    }
    else{
      this.notification.Delete("Item out of stock")
    }
  }

}
