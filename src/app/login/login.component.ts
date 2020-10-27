import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { UserService } from '../shared/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service:UserService,
    private dialog:MatDialog,
    private router:Router) { }

  incorrect:boolean=false;

  LoginForm:FormGroup=new FormGroup({
    EmailorPhone:new FormControl('',Validators.required),
    Password:new FormControl('',Validators.required)
  })


  ngOnInit(): void {
    
  }

  Register(){
    localStorage.clear();
    this.router.navigate(['/register']);
    console.log("in register")
  }


  Login(){
    this.service.Login(this.LoginForm.value).subscribe(res=>{
     let token=res;
     if(token["value"]!=null)
     {
      localStorage.setItem("token",token["value"]);
      this.router.navigate(['/home']);
      this.LoginForm.reset();
      this.InitializeForm();
     }
     else{
      console.log(res);
      this.incorrect=true;

     }
     
    })
  }

  Forgot(){
  
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="30%";
    this.dialog.open(ForgotpasswordComponent,dialogconfig);
  }

  InitializeForm(){
    this.LoginForm.setValue({
      EmailorPhone:'',
      Password:''
    })
  }

}
