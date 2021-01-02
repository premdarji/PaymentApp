import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/User';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(public service:UserService,
      private notification:NotificationService,
      private dialogref:MatDialogRef<ForgotpasswordComponent>) { }

  ngOnInit(): void {
  }
  IsTrue:Boolean=false;
  isvarified:boolean=false;
  NotVarified:boolean=false;
  token:any;

  verify(email){
   
    this.service.varifyEmail(email).subscribe(res=>{
      this.token=res;
     
      if(this.token["value"]!=null)
      {    
        this.NotVarified=false;
        this.IsTrue=true;
        this.isvarified=true;
        localStorage.setItem("token",this.token["value"]);      
      }
      if(res["message"]=="not varified"){
       
        this.NotVarified=true;
      }
   
    })
  

  }

  change(){
  
    this.service.reset(this.service.ForgotPasswordForm.value).subscribe(res=>
      {
        this.service.ForgotPasswordForm.reset();
        
        this.notification.success("Password Reset Successfully");
        this.dialogref.close();
      })
  }
}
