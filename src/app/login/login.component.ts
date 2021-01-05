import { tokenName } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { UserService } from '../shared/User';

import * as fromActions from "../Common/Actions/Product.actions";
import * as selector from "../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { AuthenticationGuard } from '../authentication.guard';
import { AuthguardService } from '../shared/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service:UserService,
    private dialog:MatDialog,
    private router:Router,
    private store:Store<ProductState>,
    private authetication:AuthguardService,
    private dialogref:MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  incorrect:boolean=false;
  selected="1";

  LoginForm:FormGroup=new FormGroup({
    EmailorPhone:new FormControl('',Validators.required),
    Password:new FormControl('',Validators.required)
  })


  ngOnInit(): void {

    // this.store.dispatch(new fromActions.CheckLogInStatus());
    // this.store.select(selector.IsLoggedIn).subscribe(res=>{
    //   if(res==true){
    //     console.log("User is Logged in")
    //   }
    //   else{
    //     console.log("user not logged in")
    //   }
      
    // })

    console.log("Return url is :"+this.data)
    
  }

  register(){
    this.dialogref.close();
    localStorage.clear();
    this.router.navigate(['/register']);

  }


  login(){
    var val=String(this.selected)

    if(val=="1"){

      this.store.dispatch(new fromActions.LogInUser(this.LoginForm.value));

      this.store.pipe(select(selector.IsLoggedIn)).subscribe(result=>{
        if(result==true){
          this.dialogref.close();
          if(this.data!=null){
            this.router.navigate([this.data]);
          }
          else{
            this.router.navigate(['/home']);
          }
          this.LoginForm.reset();
          this.initializeForm();
        }
        this.incorrect=true
      })

    }
    else{

      this.service.adminLogin(this.LoginForm.value).subscribe(res=>{
        let token=res;
        if(token["value"]!=null)
        {
         localStorage.setItem("admintoken",token["value"]);
         this.dialogref.close();
         this.router.navigate(['/admin']);
         this.LoginForm.reset();
         this.initializeForm();
        }
        else{
       
         this.incorrect=true;
   
        }
        
       })
    }
    
  }

  forgot(){
  
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="30%";
    this.dialog.open(ForgotpasswordComponent,dialogconfig);
  }

  initializeForm(){
    this.LoginForm.setValue({
      EmailorPhone:'',
      Password:''
    })
  }

}
