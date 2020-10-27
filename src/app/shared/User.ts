import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly APIURL="http://localhost:61237/api";

  constructor(private http:HttpClient) { }


  ForgotPasswordForm:FormGroup=new FormGroup({
    Email:new FormControl('',[Validators.required,Validators.email]),
    NewPassword:new FormControl('',Validators.required),
    ConfirmPassword:new FormControl('',Validators.required)
  })

  
  Submit(formdata){
   
    return this.http.post(this.APIURL+"/User/Register",formdata);
  }

  UpdateUser(formdata){
    let id=formdata["UserId"];
    return this.http.put(this.APIURL+"/User/Update/"+id,formdata)
  }

  GetAllCity(){
    return this.http.get(this.APIURL+"/City/GetAll");
  }

  Login(formdata){
    return this.http.post(this.APIURL+"/Login/login",formdata);
  }

  VarifyEmail(email){
    return this.http.post(this.APIURL+"/Login/ForgotPassword?Email="+email,email);
  }

  Reset(formdata){
    let header = new HttpHeaders();
    let token=localStorage.getItem("token");
    header=header.set('Authorization','Bearer '+token);

    console.log(header);
    return this.http.post(this.APIURL+"/Login/Reset",formdata,{headers:header});
  }


  

  changePassword(formdata){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let email=decodedToken["Email"];
    formdata.Email=email
    console.log(formdata);

    //setting header
    let header = new HttpHeaders();
    let token=localStorage.getItem("token");
    header=header.set('Authorization','Bearer '+token);
    return this.http.post(this.APIURL+"/Login/ChangePassword",formdata,{headers:header});

  }

  populateform(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let id=decodedToken["UserID"];
    return this.http.get(this.APIURL+"/User/GetById/"+id);
    
    
  }

}
