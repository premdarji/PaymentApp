import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { ProductState } from '../Common/Reducer/Product.reducer';
import { RegisterComponent } from '../register/register.component';
import { NotificationService } from '../shared/notification.service';
import { ProductService } from '../shared/product.service';
// import { RegisterComponent } from '../register/register.component';
import { UserService } from '../shared/User';
import { DashboardComponent } from './dashboard/dashboard.component';

import * as fromActions from "../Common/Actions/Product.actions";
import * as selector from "../Common/index";

import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit  {


  constructor(private dialog:MatDialog,
    private router:Router,
    private service:UserService,
    private product:ProductService,
   private notification:NotificationService,
   private store: Store<ProductState>,
   @Inject(DOCUMENT) private document:Document

    ) { }

    count:any;
    selectedclass=1;
    id:number;

  ngOnInit(): void {
    this.GetCount();
      this.selectedclass=this.service.GetID()
      console.log(this.selectedclass)


      
    this.id=this.service.GetID();
    console.log("id is:"+this.id);
    const headel=this.document.getElementsByTagName('head')[0];

    const newlink=this.document.createElement('link');
    newlink.rel="stylesheet";
    if(this.id==12){
      newlink.href="clienta.css";
      console.log("in if")
    }
    else{
      newlink.href="clientb.css";
      console.log("in else")
    }
    
    newlink.type="text/css";

    headel.appendChild(newlink);


    
  }
  user:any;

  ChangePassword(){
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="30%";
    this.dialog.open(ChangepasswordComponent,dialogconfig);
  }

  UpdateProfile(){

    this.router.navigate(['/home/register'])


  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  
  GetCount(){
    this.product.GetCount().subscribe(res=>{
      this.count=res;
   
    })
    // this.store.dispatch(new fromActions.GetCartCount());
    // this.store.pipe(select(selector.CartCount)).subscribe((result: any) => {
    //   if (result) {
    //   this.count = result;
    //   console.log(this.count)
    //   }
    // })
  }

  Orders(){
    this.router.navigate(['/home/order'])
  }

  // LHSort(){
  //   let key="price";
  //   this.dashboard.sortLH(key);
  // }
  // HLSort(){
  //   let key="price";
  //   this.dashboard.sortHL(key);
  // }


 
  Cart(){
    this.GetCount();
    if(this.count==0){
      this.notification.Delete("Cart Is Empty");
    }
    else{
      this.router.navigate(['home/cart']);
    }
  }
}
