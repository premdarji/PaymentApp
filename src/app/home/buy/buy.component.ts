import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { WindowrefService } from 'src/app/shared/windowref.service';
import { OrderService } from 'src/app/shared/order.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { Store,select } from '@ngrx/store';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class BuyComponent implements OnInit {

 
  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private sevice:ProductService,
    public _formBuilder: FormBuilder,
    private winRef:WindowrefService,
    private order:OrderService,
    private zone:NgZone,
    private notification:NotificationService,
    private store:Store<ProductState>
    ) { }

  ProductId: any; //Getting Product id from URL
  ProductData: any; //Getting Product details



  secondFormGroup: FormGroup;

  qty="1";
  total=0;
  Discount=0;
  final=0;
  Quantity=0;
  offerapplied=false;
  checking =false;
  commondata:any;
  offers=[
    {id:1,offer:"Instant 20% discount",availabe:1},
    {id:2,offer:"10% discount on SBI cards upto 500rs",availabe:1}
  ]

  ngOnInit(): void {


    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      console.log(this.commondata)
      }
    })


    this. ProductId = this.actRoute.snapshot.params['id'];
   
    this.GetProductById(this.ProductId);

    this.secondFormGroup = this._formBuilder.group({
      Add: ['', Validators.required],
      City:[''],
      Dist:[''],
      Pin:['']
    });
  }

  GetProductById(id){
    // this.sevice.GetProductById(id).subscribe(res=>{

    //   this.ProductData=res;
    //   console.log(this.ProductData)
    // })
    this.store.dispatch(new fromActions.GetProductById(id));

    this.store.pipe(select(selector.GetProductById)).subscribe((result: any) => {
      if (result) {
      this.ProductData = result;
      console.log(this.ProductData)
      }
    })

  }


  CountTotal(){

    this.total=Number(this.qty)*this.ProductData.price;
    this.final=this.total
    for(var item of this.offers){
      if(item.availabe==0){
        this.Discount=this.total*20/100;
        this.final=this.total-this.Discount;
      }
    }
  
  }


  checkstock(){
    if(this.ProductData.quantity<Number(this.qty)){
      this.notification.Delete("Not enogh in stock")
      this.qty=this.ProductData.quantity
      //this.stepper.previous();
    }
  }

  discount(availabe,index){
    if(index==0 && availabe==1){
      let price=this.total;
      this.Discount=price*20/100;
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

  OrderDetail(){
    console.log(this.ProductData);
    console.log(this.qty);
    console.log("Billing amt:"+this.total);
    console.log(this.secondFormGroup.value)
  }


//paywith razorpay gateway method
  payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_L4Raaco7n2tzbD',
      amount: this.final*100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Shopping Demo', // company name or product name
      description: '',  // product description
      offers:[
        'offer_FtQ0C6QFltWlnk'
      ],
      Offer_Id:'offer_FrxZtzVpJaf8Np',
      image: '', // company logo or product image
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
      },
      razorpay_payment_method:{}
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      let paymentDetail={
        PaymentId:options.response['razorpay_payment_id'],
        Amount:options['amount']/100,
      }
      this.order.CreateOrder(paymentDetail).subscribe(res=>{
        console.log(res);
        let Details={
          ProductId:this.ProductId,
          Amount:options['amount']/100,
          Quantity:Number(this.qty),
          OrderId:res["id"]
        }
        this.order.PostDetailOrder(Details).subscribe(res=>{
          this.zone.run(()=>{
            this.router.navigate(['/home/order']);
          })
        })
      
        
      })
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
    
    console.log(rzp.PaymentId);
  }




}
