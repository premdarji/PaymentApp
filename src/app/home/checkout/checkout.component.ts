import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmComponent, ConfirmDialogModel } from 'src/app/confirm/confirm.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/product.service';
import { WindowrefService } from 'src/app/shared/windowref.service';
import { HomeComponent } from '../home.component';

import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 


import { Store ,select} from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { generate } from 'rxjs';
import { element } from 'protractor';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    constructor(private productservice:ProductService,
  
      public dialog: MatDialog,
      public _formBuilder: FormBuilder,
      private winRef:WindowrefService,
      private order:OrderService,
      private notification:NotificationService,
      private zone:NgZone,
      private router:Router,
      private store: Store<ProductState>
    ){}


    cartItems:any[]=[];
    orderId:any;
    temp:any;
    showComponent=false;
    total:number=0;
    qty=1;
    Discount=0;
    final=0;
    offerapplied=false;
    //secondFormGroup: FormGroup;

    //form for address
    secondFormGroup = this._formBuilder.group({
      Add: ['', Validators.required],
      City:[''],
      Dist:[''],
      Pin:['']
    });


    offers=[
      {id:1,offer:"Instant 10% discount",availabe:1},
      {id:2,offer:"10% discount on SBI cards upto 500rs",availabe:1}
    ]
    commondata:any;

    ngOnInit(): void {

      //dispatch of cartitems
      this.store.dispatch(new fromActions.GetCartList());

       //get cartItems from session storage if user add item to cart before login
      let items=JSON.parse(sessionStorage.getItem("cart"))
      if(items!=null){
        if(items.length>0){
          items.forEach(element => {
            console.log(element)
             this.store.dispatch(new fromActions.GetProductById(Number(element)))
 
          });   
        }
      }

  

      //subscribe for commondata
      this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
        if (result) {
        this.commondata = result;
        }
      })

     //subscribe for cartitems
      this.store.pipe(select(selector.GetCartItems)).subscribe((result: any) => {
        if (result) {
          this.cartItems=[];
          this.temp=result;
          this.showComponent = true;
          this.temp.forEach(element => {
          if(element.stock>0){
            if(element.quantity>element.stock){
              element.quantity=element.stock;
            }
            this.cartItems.push(element)
            //console.log(this.cartItems);
          }
          });
          this.cartTotal();
        }
      })

      //subscriber for get items by their id
    
      this.store.pipe(select(selector.GetProductById)).subscribe((res:any)=>{             
        if(res!=null){
        let temp:Cart=new Cart();
        console.log("ProductId :"+res["productId"])
        temp.productId=res["productId"];
        temp.name=res["name"];
        temp.imageUrl=res["imageUrl"];
        temp.description=String(res["description"]);
        temp.price=res["price"];
        temp.stock=res["quantity"];
        
        this.cartItems.push(temp)
        console.log(this.cartItems);
      
        }
      
      })

      this.cartTotal();
    
      //this.getCartItems();
      
    }
 
    getCartItems(){
      this.cartItems=[];
      this.store.dispatch(new fromActions.GetCartList());
      this.store.pipe(select(selector.GetCartItems)).subscribe((result: any) => {
     
        if (result) {
          this.temp=result;
          this.showComponent = true;
        
          this.temp.forEach(element => {
          if(element.stock>0){
            if(element.quantity>element.stock){
              element.quantity=element.stock;
            }
            this.cartItems.push(element)
            console.log(this.cartItems);
          }
          });
          this.cartTotal();
        }
      })
    }
 

   removeFromCart(id,index){
        if(this.cartItems[index].quantity>1){
          if(this.cartItems[index].cartId!=null){
            this.store.dispatch(new fromActions.UpdateRemoveCart(id));
            this.notification.Delete("Removed from cart");
          }
          else{
            this.cartItems[index].quantity-=1;
          }
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
                    // if(this.cartItems[index].cartId==null){
                    //   let items=[];
                    //   items= JSON.parse(sessionStorage.getItem("cart"));
                    //   var index=items.indexOf(this.cartItems)
                    //   items.splice(items.indexOf(index),1);
                    //   sessionStorage.setItem("cart",JSON.stringify(items))
                    // }
                
                    this.store.dispatch(new fromActions.DeleteFromCart(id));
                    this.notification.Delete("Item is removed from cart"); 
                  }
            });
          }
    } 

    addToCart(id,index){
  
      if(this.cartItems[index].stock>this.cartItems[index].quantity){
        if(this.cartItems[index].cartId!=null){
          this.store.dispatch(new fromActions.UpdateAddCart(id));
          this.notification.update("Added to cart");
        }
        else{
          this.cartItems[index].quantity+=1;
        }
      }
      else{
        this.notification.Delete("Out of Stock")
      }  
    }
 
    cartTotal(){
      this.total=0;
      this.cartItems.forEach(element => {
        this.total += (element.quantity*element.price)
        this.final=this.total;
      });
    }
  
    discount(availabe,index){
      if(index==0 && availabe==1){
        let price=this.total;
        this.Discount=price*10/100;
        this.final=this.total-this.Discount;
        this.offers[index].availabe=0;
        this.offerapplied=true
      }
      if(index==1 && availabe==1){
        this.final=this.total;
        this.offers[index].availabe=0;
        this.offerapplied=true;
      }
    }


    payWithRazor() {
   
      const options: any = {
        key: 'rzp_test_L4Raaco7n2tzbD',
        amount: this.final*100, // amount should be in paise format to display Rs 1255 without decimal point
        currency: 'INR',
        name: 'Shopping Demo', // company name or product name
        description: '',  // product description
        image: '', // company logo or product image
        offerid:"offer_FrxZtzVpJaf8Np",
        //order_id: 2, // order_id created by you in backend
        modal: {
          // We should prevent closing of the form when esc key is pressed.
          escape: false,
        },
        notes: {
          // include notes if any
        },
        prefill:{
          Email:"demo@gmail.com",
          contact:"8877887766"
        },
        theme: {
          color: '#0c238a'
        }
      };
      options.handler = ((response, error) => {
        
        options.response = response;

        let paymentDetail={
          PaymentId:options.response['razorpay_payment_id'],
          Amount:this.final
        }
      
        this.store.dispatch(new fromActions.CreateOrder(paymentDetail));
        this.store.select(selector.OrderId).subscribe((result: any) => {
          if (result) {
            this.orderId = result;
            let Detail={
              ProductId:'',
              Amount:0,
              Quantity:'',
              OrderId:''
            } 
            this.cartItems.forEach(element => {
              Detail.ProductId=element.productId,
              Detail.Amount=element.quantity*element.price,
              Detail.Quantity=element.quantity,
              Detail.OrderId=this.orderId;
              this.store.dispatch(new fromActions.CreateOrderDetails(Detail));
              this.deleteFromCart(element.cartId);
            });
          }
          this.sendInvoiceDetails()
        })
    
      });
      options.modal.ondismiss = (() => {
        
        console.log('Transaction cancelled.');
        this.notification.Delete("Complete payment for order");
      });
      const rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
    }



  deleteFromCart(cartId){
    this.store.dispatch(new fromActions.DeleteFromCart(cartId));
  }

  sendInvoiceDetails(){

    this.zone.run(()=>{
      this.notification.success("Please wait a moment we are processing your order.");
    })
   
    this.store.dispatch(new fromActions.SendEmail(this.orderId));  
    this.store.pipe(select(selector.MailSent)).subscribe(res=>{
      console.log(res)
      if(res==true){
        this.zone.run(()=>{
          this.router.navigate(['/home/order']);
        })
      }
    })
  }

}
