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

 
  getAll(number,size):Observable<Product[]>{
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
  
    return this.http.get<Product[]>(this.APIURL+"/Product/GetAll/"+userid+'/'+number+"/"+size);
  }

  getProductsByCategory(id){

    return this.http.get(this.APIURL+"/Product/GetByCategory/"+id);
  }


  getProductById(id){
    return this.http.get(this.APIURL+"/Product/GetById/"+id);
  }

  addtoCart(id){
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

  getCartItems(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    return this.http.get(this.APIURL+"/Cart/GetByUserId/"+userid);
  }

  getCount(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token"));
    let userid=decodedToken["UserID"];
    return this.http.get(this.APIURL+"/Cart/GetCount/"+userid);

  }

  deleteFormCart(id){
    return this.http.delete(this.APIURL+"/Cart/Delete/"+id);
  }
  
  updateAddCart(id){
    return this.http.put(this.APIURL+"/Cart/AddToCart",id);
  }

  updateRemoveCart(id){
    return this.http.put(this.APIURL+"/Cart/Remove",id);
  }


  //product crud operations
  addProduct(){
    return this.http.post(this.APIURL+"/Product/Add",this.ProductForm.value);
  }

  getCategory(){
    return this.http.get(this.APIURL+"/Category/GetAll");
  }

  populateForm(data){
    //debugger
    return this.http.get(this.APIURL+"/Product/GetById/"+data)
    
  }

  deleteProduct(data){
    return this.http.delete(this.APIURL+"/Product/Delete/"+data)
  }

  updateProduct(){
    return this.http.put(this.APIURL+"/Product/Update",this.ProductForm.value);
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

  getAllProducts(){
    return this.http.get(this.APIURL+"/Product/AllProduct");
  }



  //operations on category

  addCategory(){
    return this.http.post(this.APIURL+"/Category/Add",this.CategoryForm.value);
  }

  deleteCategory(id){
    return this.http.delete(this.APIURL+"/Category/Delete/"+id);
  }

  populateCategory(id){
    this.http.get(this.APIURL+"/Category/GetById/"+id).subscribe(res=>{
      this.categorydata=res;
      this.CategoryForm.setValue({
        CategoryId:this.categorydata.categoryId,
        Name:this.categorydata.name
      })
    })
  }

  
  initializeCategory(){
    this.CategoryForm.setValue({
      CategoryId:0,
      Name:''
    })
  }
  updateCategory(){
    return this.http.put(this.APIURL+"/Category/Update/",this.CategoryForm.value);
  }
}
