import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, of as Observableof } from 'rxjs';
import { stat } from 'fs';
import { AuthenticationGuard } from '../authentication.guard';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly APIURL="http://localhost:61237/api";

  constructor(private http:HttpClient,
              private authguard:AuthenticationGuard) { }


  ForgotPasswordForm:FormGroup=new FormGroup({
    Email:new FormControl('',[Validators.required,Validators.email]),
    NewPassword:new FormControl('',Validators.required),
    ConfirmPassword:new FormControl('',Validators.required)
  })

  
  submit(formdata){
   
    return this.http.post(this.APIURL+"/User/Register",formdata);
  }

  updateUser(formdata){
    let id=formdata["UserId"];
    return this.http.put(this.APIURL+"/User/Update/"+id,formdata)
  }

  getAllCity(){
    return this.http.get(this.APIURL+"/City/GetAll");
  }

  login(formdata){
    return this.http.post(this.APIURL+"/Login/login",formdata);
  }

  adminLogin(formdata){
    return this.http.post(this.APIURL+"/Login/AdminLogin",formdata);
  }

  varifyEmail(email){
    return this.http.post(this.APIURL+"/Login/ForgotPassword?Email="+email,email);
  }

  reset(formdata){
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

  getID(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let id=decodedToken["UserID"];
    return id;
  }


  activateUser(id){
    return this.http.post(this.APIURL+"/User/Activate/"+id,null);
  }

  checkLogInStatus():Observable<boolean>{

    var status=this.authguard.canActivate();
    if(status==true){
      return Observableof(true);
    }
    return Observableof(false)
  }

}
