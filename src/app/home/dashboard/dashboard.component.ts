import { Component, Directive, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/Common/Store/app-state';
import { Product } from 'src/app/models/Product.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProductService } from 'src/app/shared/product.service';
import { WishlistService } from 'src/app/shared/wishlist.service';
import { HomeComponent } from '../home.component';

import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';
import { debug } from 'console';
import { LanguageService } from 'src/app/shared/language.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service:ProductService,
    private notification:NotificationService,
    private router:Router,
    private wishlistservice:WishlistService,
    private home:HomeComponent,
    private store: Store<ProductState>,
    private lang:LanguageService,
    private dialog:MatDialog
  ) { }
  //private store: Store<AppState>

  products:Product[]=[];
  filter:any;
  selected="";
  wishlist:any[]=[];
  temp:any;
  pageNumber=1;
  pageSize=6;
  categoryselected:boolean=false;
  commondata:any;
  isLoggedIn:boolean;
  

  ngOnInit(): void {
    //this.RefreshProducts(); 
   // this.store.dispatch(new fromActions.CheckLogInStatus());
    this.loadProduct();
   // this.getProducts();

    this.store.pipe(select(selector.CommonData)).subscribe((result: any) => {
      if (result) {
      this.commondata = result;
      
      }
    })

    
  }


  getProducts(){
    this.store.pipe(select(selector.GetProductList)).subscribe((result: any) => {
      if (result) {
      this.products = result;
      }
    })
  }

  loadProduct(){

    this.store.pipe(select(selector.IsLoggedIn)).subscribe((result: any) => {
      
      this.isLoggedIn = result;
        if(this.isLoggedIn==false){
          console.log("not logged in")
          this.store.dispatch(new fromActions.GetAllProductsGuest());
          this.store.pipe(select(selector.ProductsGuest)).subscribe((result: any) => {
            if (result) {
            this.products = result;
            }
          })
    
        }
        else{
          this.getProducts();
          this.store.pipe(select(selector.CheckLimit)).subscribe((result: any) => {
            if (result==false) {
            this.store.dispatch(new fromActions.GetProductList(this.pageNumber,this.pageSize));
              this.getProducts();
            }
          })
    
        }  
      
    })

   

  }
  

  // refreshProducts(){
  //   this.service.getAll(this.PageNumber,this.PageSize).subscribe(res=>{
  //     if(res["message"]=="nodata"){
  //       this.PageNumber=this.PageNumber-1;
  //       this.notification.Delete("No More Products")
  //     }
  //     else{
  //       this.temp=res;
  //       this.Products.push(...this.temp);
  //       console.log(this.Products)
  //     }
      
  //   })
  // }

  noCategory(){
    this.categoryselected=false;
    this.products=[];
    this.pageNumber=1;
    this.getProducts();
  }

  clear(){
    console.log("clear")
    this.filter='';
  }

  key: string = 'price'; //set default
  reverse: boolean = false;
  sortLH(key){
    this.key = key;
    this.reverse = false;
  }
  sortHL(key){
    this.key = key;
    this.reverse = true;
  }

  addtoCart(data){

    if(this.checkLoginStatus()){
      this.store.dispatch(new fromActions.AddToCart(data));
      this.home.getCount();
    }
    else{
      this.login();
      this.notification.Delete("Please log in or register  before add this product to your cart");
    }
   
  }

  getProductsByCategory(data){
    this.categoryselected=true;
    console.log(this.selected)
    this.service.getProductsByCategory(data).subscribe(res=>{
      this.products=[];
      this.temp=res;
      this.products.push(...this.temp)
     
    })
  }

  detail(Id){
    this.router.navigate(['/home/detail/',Id]);

  }

  buyNow(Id){
    if(this.checkLoginStatus()){
      this.router.navigate(['/home/buy/',Id]);
    }
    else{
      this.login()
      this.notification.Delete("Please log in or register  before buy this product")
    }
  }

  removefromwishlist(data,index){
    if(this.checkLoginStatus()){
      this.products[index].isWishListItem = false;
      this.notification.Delete("Removed from wishlist");
      this.store.dispatch(new fromActions.RemoveFromWishlist(this.products,data));

    }
    else{

    }

   
   
  }

  addToWishlist(data,index){
    if(this.checkLoginStatus()){
      
    this.notification.update("Added to wishlist");
    this.products[index].isWishListItem = true;
    this.store.dispatch(new fromActions.AddToWishlist(this.products,data));

    }
    else{
      this.notification.Delete("Login to your account first to add items in your wishlist");
    }



  }

  checkLoginStatus():boolean{
    this.store.dispatch(new fromActions.CheckLogInStatus());
    this.store.select(selector.IsLoggedIn).subscribe(res=>{
     this.isLoggedIn=res
    })
    if(this.isLoggedIn==true){
      return true;
    }
    return false;
  
  }

  login(){
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="40%";
    this.dialog.open(LoginComponent,dialogconfig);

  }






  
@HostListener("document:scroll")


  scrollfunction() {
    //In chrome and some browser scroll is given to body tag
 
   
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page

      if(this.categoryselected==false){
        this.store.pipe(select(selector.CheckLimit)).subscribe((result: any) => {
          if (result==false) {
            this.pageNumber=this.pageNumber+1;

            //this.RefreshProducts();
            this.loadProduct()
      
          }
        })

      }

    
      }


    }
    
}
