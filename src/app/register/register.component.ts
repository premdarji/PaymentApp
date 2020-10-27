import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/User';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service:UserService,
    private notification:NotificationService,
    private router:Router) { }

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
    CityId:new FormControl('',Validators.required),
    Password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  
   ConfirmPassword:new FormControl('')
  },{
    validators: this.checkPasswords
    }
  );



  ngOnInit(): void {
    this.service.GetAllCity().subscribe(res=>{
      this.cities=res;
    })
    let token=localStorage.getItem("token");
    if(token!=null){
      this.updateform();
    }

  }

  get f() { return this.UserForm.controls; }

  Register(){
    if(!this.UserForm.invalid){
      if(this.UserForm.controls["UserId"].value>0){
        console.log("done")
        this.service.UpdateUser(this.UserForm.value).subscribe(res=>{
          
          this.router.navigate(['/home']);
          this.notification.update("Profile Updated");
        
  
        })
      }
      else{
        console.log(this.UserForm.value);
        this.service.Submit(this.UserForm.value).subscribe(res=>{
          if(res['message']=="Exist"){
            this.notification.Delete("Email Address already exist");
          }
          else{
            console.log("submitted");
            this.router.navigate(['/login']);
            this.notification.success("User Registered Successfully");

          }
      
        })
  
      }

    }
    else{
      this.notification.Delete("Form Invalid")
    }
   
   
  }

  updateform(){

    this.service.populateform().subscribe(res=>{
        this.user=res;
        console.log(this.user)
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
