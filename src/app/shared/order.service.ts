import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly APIURL="http://localhost:61237/api";
  constructor(private http:HttpClient) { }

  CreateOrder(orderDetail){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    orderDetail.UserId=userid
    console.log(orderDetail);
    return this.http.post(this.APIURL+"/Order",orderDetail);
  }

  GetAll(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    return this.http.get(this.APIURL+"/Order/GetAll/"+userid);
  }

  PostDetailOrder(Detail){
    console.log(Detail)
    return this.http.post(this.APIURL+"/Order/Detail",Detail);
  }

  GetInvoiceDetails(){
    return this.http.get(this.APIURL+"/Order/Invoice");
  }

  SendInvoiceMail(id){
    return this.http.post(this.APIURL+"/Order/Invoice",id);
  }


  getOrderDetailById(id){
    return this.http.get(this.APIURL+"/Order/OrderById/"+id)
  }

  cancelOrder(Order){
    return this.http.post(this.APIURL+"/Order/CancelOrder",Order);
  }

}
