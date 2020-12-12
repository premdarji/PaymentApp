import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { provideRoutes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly APIURL="http://localhost:61237/api";

  productdata:any;
  categorydata:any;

  ProductForm:FormGroup=new FormGroup({
    ProductId:new FormControl(0),
    Name:new FormControl('',Validators.required),
    Price:new FormControl('' ,Validators.required),
    Quantity:new FormControl('',[Validators.required,Validators.min(0)]),
    Description:new FormControl(''),
    CategoryId:new FormControl('',Validators.required),
    ImageUrl:new FormControl('')

  })

  CategoryForm:FormGroup=new FormGroup({
    CategoryId:new FormControl(0),
    Name:new FormControl('',Validators.required)
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
    //debugger
    return this.http.get(this.APIURL+"/Product/GetById/"+data)
    
  }

  DeleteProduct(data){
    return this.http.delete(this.APIURL+"/Product/Delete/"+data)
  }

  UpdateProduct(id,data){
    return this.http.put(this.APIURL+"/Product/Update/"+id,data);
  }

  initializeForm(){
    this.ProductForm.setValue({
      ProductId:0,
      Name:'',
      Price:'',
      Quantity:'',
      Description:'',
      CategoryId:'',
      ImageUrl:''
    })
  }

  GetAllProducts(){
    return this.http.get(this.APIURL+"/Product/AllProduct");
  }



  //operations on category

  AddCategory(){
    return this.http.post(this.APIURL+"/Category/Add",this.CategoryForm.value);
  }

  DeleteCategory(id){
    return this.http.delete(this.APIURL+"/Category/Delete/"+id);
  }

  PopulateCategory(id){
    this.http.get(this.APIURL+"/Category/GetById/"+id).subscribe(res=>{
      this.categorydata=res;
      this.CategoryForm.setValue({
        CategoryId:this.categorydata.categoryId,
        Name:this.categorydata.name
      })
    })
  }

  InitializeCategory(){
    this.CategoryForm.setValue({
      CategoryId:0,
      Name:''
    })
  }
  UpdateCategory(id){
    return this.http.put(this.APIURL+"/Category/Update/"+id,this.CategoryForm.value);
  }
}
