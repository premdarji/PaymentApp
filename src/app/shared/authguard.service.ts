import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(public jwtHelper: JwtHelperService) { }


  
  getToken(): string {
    return localStorage.getItem("token");
  }


  getTokenExpirationDate(token: string): Date {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));

    if (decodedToken.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }


}
