import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly APIURL="http://localhost:61237/api";

  constructor(private http:HttpClient) { }

  addToWishlist(id){
    var userid=this.getId();
    let wishlist={
      wishlistId:0,
      ProductId:id,
      UserId:userid
    }
    return this.http.post(this.APIURL+"/Wishlist",wishlist);

  }
  getWishlist(){
    var userid=this.getId();
    return this.http.get(this.APIURL+"/Wishlist/GetAll/"+userid);
  }

  removeFromWishlist(id){
   var userid=this.getId();
    return this.http.post(this.APIURL+"/Wishlist/Remove/"+id+"/"+userid,null);

  }

  delete(id){
    return this.http.post(this.APIURL+"/Wishlist/delete",id);
  }

  getId(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    return userid;
  }
}
