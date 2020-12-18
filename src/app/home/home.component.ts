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
import { LanguageService } from '../shared/language.service';
import { SignalRserviceService } from '../shared/signal-rservice.service';


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
   @Inject(DOCUMENT) private document:Document,
   private language:LanguageService,
   private signalservice:SignalRserviceService

    ) { }

    count:any;
    selectedclass=1;
    id:number;
    commondata:any;
    SelectedLang="1";

  ngOnInit(): void {

    this.signalservice.startConnection();

    setTimeout(()=>{
      this.signalservice.askServerListener();
    },2000)



    this.store.dispatch(new fromActions.GetCommonFields("en"));
  

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      }


    })

    // this.language.GetData("en").subscribe(res=>{
    //   this.commondata=res;
    // })

    this.GetCount();
    
    this.selectedclass=this.service.GetID()
 

      
    this.id=this.service.GetID();

    var link=this.document.getElementById('theme');

    if(this.id==1){
     
      link.setAttribute('href','clienta.css');
    }
    else{
      
      link.setAttribute('href','clientb.css')
      
    }



    // const headel=this.document.getElementsByTagName('head')[0];

    // const newlink=this.document.createElement('link');
    // newlink.rel="stylesheet";
    // if(this.id==12){
    //   newlink.href="clienta.css";
    //   console.log("in if")
    // }
    // else{
    //   newlink.href="clientb.css";
    //   console.log("in else")
    // }
    
    // newlink.type="text/css";

    // headel.appendChild(newlink);


    
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

  Language(data){

    if(data=="en"){
      this.store.dispatch(new fromActions.GetCommonFields("en"));
    }
    else{
      this.store.dispatch(new fromActions.GetCommonFields("fr"));
    }
   
    // this.language.GetData(data).subscribe(res=>{
    //   this.commondata=res;
    // })
  }
}
