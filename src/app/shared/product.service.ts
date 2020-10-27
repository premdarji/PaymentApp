import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly APIURL="http://localhost:61237/api";

  constructor(private http:HttpClient) { }

 
  GetAll(number,size){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
  
    return this.http.get(this.APIURL+"/Product/GetAll/"+userid+'/'+number+"/"+size);
  }

  GetProductsByCategory(id){

    return this.http.get(this.APIURL+"/Product/GetByCategory/"+id);
  }


  GetProductById(id){
    return this.http.get(this.APIURL+"/Product/GetById/"+id);
  }

  AddtoCart(id){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    let Cart={
      CartId:0,
      ProductId:id,
      UserId:userid,
      Quantity:1
    }
    return this.http.post(this.APIURL+"/Cart",Cart);
  }

  GetCartItems(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    return this.http.get(this.APIURL+"/Cart/GetByUserId/"+userid);
  }

  GetCount(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    return this.http.get(this.APIURL+"/Cart/GetCount/"+userid);

  }

  RemoveFormCart(id){
    return this.http.delete(this.APIURL+"/Cart/Delete/"+id);
  }
  
  UpdateCart(id,qty){
    return this.http.put(this.APIURL+"/Cart/Update/"+id+"/"+qty,null);
  }


}
