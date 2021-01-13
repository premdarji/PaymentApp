import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { UserService } from 'src/app/shared/User';
import { NotificationService } from 'src/app/shared/notification.service';
import { WindowrefService } from 'src/app/shared/windowref.service';

@Component({
  selector: 'app-mywallet',
  templateUrl: './mywallet.component.html',
  styleUrls: ['./mywallet.component.css']
})
export class MywalletComponent implements OnInit {

  constructor(
    private dialogref:MatDialogRef<MywalletComponent>,
    private store:Store<ProductState>,
    private user:UserService,
    private notification:NotificationService,
    private winRef:WindowrefService,
    private zone:NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  amt=0;
  fillAmt:number;
  userDetail:any;
 

  ngOnInit(): void {
    
    if(this.data>0){
      this.fillAmt=this.data;
    }
    this.store.dispatch(new fromActions.GetUserDetails());

    this.store.pipe(select(selector.UserDetail)).subscribe(res=>{
      if(res!=null){
        this.userDetail=res;
        this.amt=this.userDetail.walletAmt
        this.notification.update("wallet amount is:"+res["walletAmt"]);
        console.log(this.userDetail);
      }
    })
   
  }

  fillAmount(amount){
    this.fillAmt=amount;
  }

  add(){
    console.log("the amount is :"+this.fillAmt);

    this.store.dispatch(new fromActions.UpdateWallet(this.fillAmt));

    this.store.pipe(select(selector.UserDetail)).subscribe(res=>{
      if(res!=null){
        this.notification.update("wallet amount is:"+res["walletAmt"]);
        this.dialogref.close();
      }
    })
  }

  AddWithDebitCard(){
    console.log("add with debit card")
  }


  payWithRazor() {
    const options: any = {
      key: 'rzp_test_L4Raaco7n2tzbD',
      amount: this.fillAmt*100, // amount should be in paise format to display Rs 1255 without decimal point
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
        Email:this.userDetail["email"],
        contact:this.userDetail["phone"]
      },
      theme: {
        color: '#0c238a'
      },
      razorpay_payment_method:{}
    };

    options.handler = ((response, error) => {
      options.response = response;
        this.updateWallet();
      // this.store.pipe(select(selector.UserDetail)).subscribe(res=>{
      // if(res!=null){
       
       
      // }
      // })
    
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
    
   
  }

  updateWallet(){
    this.zone.run(()=>{
      this.store.dispatch(new fromActions.UpdateWallet(this.fillAmt));

      this.dialogref.close();
    })
  }

}
