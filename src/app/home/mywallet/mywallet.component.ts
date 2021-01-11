import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { UserService } from 'src/app/shared/User';
import { NotificationService } from 'src/app/shared/notification.service';

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
    private notification:NotificationService
    
  ) { }

  amt=0;
  fillAmt:number;
  userDetail:any;
 

  ngOnInit(): void {
    this.store.dispatch(new fromActions.GetUserDetails());

    this.store.pipe(select(selector.UserDetail)).subscribe(res=>{
      if(res!=null){
        this.userDetail=res;
        this.amt=this.userDetail.walletAmt
        console.log(this.userDetail);
      }
    })
   
  }

  fillAmount(amount){
    this.fillAmt=amount;
  }

  Add(){
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

}
