import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly APIURL="http://localhost:61237/api";

  constructor(private http:HttpClient) { }

  AddToWishlist(id){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    let wishlist={
      wishlistId:0,
      ProductId:id,
      UserId:userid
    }
    return this.http.post(this.APIURL+"/Wishlist",wishlist);

  }
  GetWishlist(){
    return this.http.get(this.APIURL+"/Wishlist");
  }

  RemoveFromWishlist(id){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    return this.http.post(this.APIURL+"/Wishlist/Remove/"+id+"/"+userid,null);

  }
}
