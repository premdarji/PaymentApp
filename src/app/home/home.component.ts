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
import { LoginComponent } from '../login/login.component';


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
   private languageService:LanguageService,
   private signalservice:SignalRserviceService

    ) { }

    count:any;
    selectedclass=1;
    id:number;
    commondata:any;
    SelectedLang="1";
    opened=false
    isLoggedIn=true;
    user:any;

  ngOnInit(): void {
 
    this.checkLogInStatus()
    this.store.dispatch(new fromActions.GetCommonFields("en"));
  

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      //console.log(this.commondata)
      }
    })
   
   this.getCount();
    
    //this.selectedclass=this.service.getID()
 

      
    //this.id=this.service.getID();

    var link=this.document.getElementById('theme');

    if(this.id==1){
     
      link.setAttribute('href','clientb.css');
    }
    else{
      
      link.setAttribute('href','clienta.css')
      
    }


    
  }


  changePassword(){
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="30%";
    this.dialog.open(ChangepasswordComponent,dialogconfig);
  }

  updateProfile(){
    this.router.navigate(['/home/register'])
  }

  logout(){
    localStorage.clear();
    this.checkLogInStatus();
    this.router.navigate(['/home/dashboard']);
  }

  
  getCount(){
    if(this.checkLogInStatus()){
      this.store.dispatch(new fromActions.GetCartCount());
      this.store.pipe(select(selector.CartCount)).subscribe(res=>{
        this.count=res;
      })
      // this.product.getCount().subscribe(res=>{
      //   this.count=res;
      // })
    }
    else{
      this.count=sessionStorage.getItem("CartLength");
    }
  
  }

  orders(){
    this.router.navigate(['/home/order'])
  }

 


  cart(){
    this.router.navigate(['home/cart']);
    // if(this.checkLogInStatus()){
    //     this.getCount();
    //     if(this.count==0){
    //       this.notification.Delete("Cart Is Empty");
    //     }
    //     else{
    //       this.router.navigate(['home/cart']);
    //     }
    // }
    // else{
    //   const dialogconfig=new MatDialogConfig();
    //   dialogconfig.disableClose=false;
    //   dialogconfig.autoFocus=true;
    //   dialogconfig.width="40%";
    //   this.dialog.open(LoginComponent,dialogconfig);
    //   this.notification.Delete("Please log in or register then only you can open your cart");
    // }
    
  }

  language(data){

    if(data=="en"){
      this.store.dispatch(new fromActions.GetCommonFields("en"));
    }
    else{
      this.store.dispatch(new fromActions.GetCommonFields("fr"));
    }
  }

  checkLogInStatus():boolean{
    this.store.dispatch(new fromActions.CheckLogInStatus());
    this.store.pipe(select(selector.IsLoggedIn)).subscribe(res=>{
     this.isLoggedIn=res;
    })
    if(this.isLoggedIn==true){
      return true;
    }
    return false;
  }

  login(){
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="40%";
    this.dialog.open(LoginComponent,dialogconfig);

  }
}
