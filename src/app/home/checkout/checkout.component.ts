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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private productservice:ProductService,
    private home:HomeComponent,
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
    secondFormGroup: FormGroup;

    offers=[
      {id:1,offer:"Instant 10% discount",availabe:1},
      {id:2,offer:"10% discount on SBI cards upto 500rs",availabe:1}
    ]
    commondata:any;

  ngOnInit(): void {

    
    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      }
    })

    this.getCartItems();
    this.home.GetCount();

    this.secondFormGroup = this._formBuilder.group({
      Add: ['', Validators.required],
      City:[''],
      Dist:[''],
      Pin:['']
    });
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
         }
        });
        this.cartTotal();
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
      this.store.pipe(select(selector.OrderId)).subscribe((result: any) => {
        if (result) {
        this.orderId = result;
        
        this.generateInvoicePdf();
        }
      })
  
    });
    options.modal.ondismiss = (() => {
      
      console.log('Transaction cancelled.');
      this.notification.Delete("Complete payment for order");
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }





  generateInvoicePdf(){

    var data = document.getElementById('contentToConvert');  

    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 200;   
      var pageHeight = 1600;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
  
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
   
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  
      pdf.save('Invoice_'+this.orderId+'.pdf'); // Generated PDF   




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
        this.store.dispatch(new fromActions.RemoveFromCart(element.cartId));
    
      });

      // this.order.SendInvoiceMail(this.orderId).subscribe(res=>{
        
       
      // })
    
    

    });  
    this.zone.run(()=>{
      this.router.navigate(['/home/order']);
    })

  
            
          

  }

}
