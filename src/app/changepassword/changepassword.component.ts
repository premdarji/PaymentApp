import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/User';



import { Store ,select} from '@ngrx/store';
import { ProductState } from '../Common/Reducer/Product.reducer';
import * as fromActions from "../Common/Actions/Product.actions";
import * as selector from "../Common/index";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(public service:UserService,
    private dialogref:MatDialogRef<ChangepasswordComponent>,
    private notification:NotificationService,
    private store: Store<ProductState>) { }


    
  ChangePasswordForm:FormGroup=new FormGroup({
  
    CurrentPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    NewPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    ConfirmPassword:new FormControl('')
  },{
    validators: this.checkPasswords
    }
  );

  commondata:any;

  ngOnInit(): void {

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      }
    })

  }

  ChangePassword(){
    this.service.changePassword(this.ChangePasswordForm.value).subscribe(res=>{
      this.dialogref.close();
      this.notification.update("Password Changed");

    })
  }


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('NewPassword').value;
  let confirmPass = group.get('ConfirmPassword').value;

  return pass === confirmPass ? null : { notSame: true }     
}

}
