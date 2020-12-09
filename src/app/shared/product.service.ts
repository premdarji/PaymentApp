import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly APIURL="http://localhost:61237/api";


  ProductForm:FormGroup=new FormGroup({
    ProductId:new FormControl(0),
    Name:new FormControl(''),
    Price:new FormControl(0),
    Quantity:new FormControl(0),
    Description:new FormControl(''),
    CategoryId:new FormControl(),
    ImageUrl:new FormControl('')

  })

  constructor(private http:HttpClient) { }

 
  GetAll(number,size):Observable<Product[]>{
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
  
    return this.http.get<Product[]>(this.APIURL+"/Product/GetAll/"+userid+'/'+number+"/"+size);
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


  //product crud operations
  AddProduct(){
    return this.http.post(this.APIURL+"/Product/Add",this.ProductForm.value);
  }

  GetCategory(){
    return this.http.get(this.APIURL+"/Category/GetAll");
  }

  PopulateForm(data){
    this.http.get(this.APIURL+"/Product/GetById/"+data).subscribe(res=>{
     
      this.ProductForm.setValue({
        ProductId:res.productId,
        Name:res.name,
        Price:res.price,
        CategoryId:res.categoryId,
        Quantity:res.quantity,
        Description:res.description,
        ImageUrl:res.imageUrl
      })
    })
  }

  DeleteProduct(data){
    return this.http.delete(this.APIURL+"/Product/Delete/"+data)
  }

  UpdateProduct(id,data){
    return this.http.put(this.APIURL+"/Product/Update/"+id,data);
  }
}
