import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { RegisterComponent } from '../register/register.component';
import { ProductService } from '../shared/product.service';
// import { RegisterComponent } from '../register/register.component';
import { UserService } from '../shared/User';
import { DashboardComponent } from './dashboard/dashboard.component';

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
   // private dashboard:DashboardComponent
    ) { }

    count:any;

  ngOnInit(): void {
    this.GetCount();
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
}
