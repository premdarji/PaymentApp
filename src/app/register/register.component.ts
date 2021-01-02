import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/User';


import { Store,select } from '@ngrx/store';
import { ProductState } from '../Common/Reducer/Product.reducer';
import * as fromActions from "../Common/Actions/Product.actions";
import * as selector from "../Common/index";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service:UserService,
    private notification:NotificationService,
    private router:Router,
    private store: Store<ProductState>
    ) { }

  cities:any;
  selected="1";
  user:any;


  
  UserForm:FormGroup=new FormGroup({
    UserId:new FormControl(0),
    FirstName:new FormControl('',Validators.required),
    LastName:new FormControl('',Validators.required),
    Email:new FormControl('',[Validators.required,Validators.email]),
    Address:new FormControl(''),
    Phone:new FormControl('',Validators.maxLength(10)),
    CityId:new FormControl(''),
    Password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  
   ConfirmPassword:new FormControl('')
  },{
    validators: this.checkPasswords
    }
  );

  commondata:any;

  ngOnInit(): void {

     
 
   
     // this.store.dispatch(new fromActions.GetCommonFields("en"));
    
 



    this.service.getAllCity().subscribe(res=>{
      this.cities=res;
    })
    let token=localStorage.getItem("token");
    if(token!=null){
      this.updateform();
    }
    else{
      this.store.dispatch(new fromActions.GetCommonFields("en"));
      
    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      console.log(this.commondata)
      }
    })
    }

  }

  get f() { return this.UserForm.controls; }

  register(){
    if(!this.UserForm.invalid){
      if(this.UserForm.controls["UserId"].value>0){
        console.log("done")
        this.service.updateUser(this.UserForm.value).subscribe(res=>{
          
          this.router.navigate(['/home']);
          this.notification.update("Profile Updated");
        
  
        })
      }
      else{
        console.log(this.UserForm.value);
        this.service.submit(this.UserForm.value).subscribe(res=>{
          if(res['message']=="Exist"){
            this.notification.Delete("Email Address already exist");
          }
          else{
            console.log("submitted");
            this.router.navigate(['/login']);
            this.notification.success("User Registered Successfully and activation link sent your registered email");

          }
      
        })
  
      }

    }
    else{
      this.notification.Delete("Form Invalid")
    }
   
   
  }

  updateform(){

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      console.log(this.commondata)
      }
    })

    this.service.populateform().subscribe(res=>{
        this.user=res;
        //console.log(this.user)
        this.selected=String(this.user.cityId);
        console.log("selected is"+this.selected);
        this.UserForm.setValue({
        UserId:this.user.userId,
        FirstName:this.user.firstName,
        LastName:this.user.lastName,
        Phone:this.user.phone,
        Email:this.user.email,
        Address:this.user.address,
        CityId:this.user.cityId,
        Password:this.user.password,
        ConfirmPassword:this.user.password

      })
    })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('Password').value;
  let confirmPass = group.get('ConfirmPassword').value;

  return pass === confirmPass ? null : { notSame: true }     
}
}
