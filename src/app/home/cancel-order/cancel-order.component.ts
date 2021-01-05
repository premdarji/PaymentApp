import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/shared/notification.service';



@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {

  constructor( private dialogref:MatDialogRef<CancelOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datePipe: DatePipe,
    private store:Store<ProductState>,
    private notification:NotificationService) { }

  selectedReason: string;
  otherReason:string;
  reason:string;
  reasons: string[] = ['Not as expected', 'Defective item' ,'Other'];
  orderDetail:any;
  myDate = new Date();
  ngOnInit(): void {
    console.log(this.data)
    this.getOrderDetailById(this.data)
  }

  getOrderDetailById(id){
    this.store.dispatch(new fromActions.GetOrderById(id));
    this.store.pipe(select(selector.OrderById)).subscribe((result: any) => {
      if (result) {
      this.orderDetail = result;
      }
    })
  }

  confirmCancel(){

    if(this.selectedReason=='Other'){
        this.reason=this.otherReason;
    }
    else{
      this.reason=this.selectedReason;
    }

    var createdDate=new Date(this.orderDetail.createdOn);

    var Difference_In_Time =  this.myDate.getTime()-createdDate.getTime(); 
  
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

    if(Difference_In_Days<5){

      let Order={
        CancelOrderId:0,
        OrderId:this.orderDetail.detailOrderId,
        Reason:this.reason
      }
      this.store.dispatch(new fromActions.CancelOrder(Order));
      this.notification.success("Please wait we are proccesing your request. ")
      this.dialogref.close();

    }
    else{
      this.dialogref.close();
      this.notification.Delete("According to policy you can't cancel order after 10 days.")
    }
  }

}
