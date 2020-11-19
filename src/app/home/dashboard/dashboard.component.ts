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
    private store: Store<ProductState>
  ) { }
  //private store: Store<AppState>

  products:Product[]=[];
 
  Products:any[]=[];
  filter:any;
  selected="";
  wishlist:any[]=[];
  temp:any;
  PageNumber=1;
  PageSize=6;
  categoryselected:boolean=false;
  

  ngOnInit(): void {
    //this.RefreshProducts(); 
    this.loadProduct();
    this.GetProducts()
  }


  GetProducts(){
    this.store.pipe(select(selector.GetProductList)).subscribe((result: any) => {
      if (result) {
      this.products = result;
      console.log(this.products)
      }
    })
  }

  loadProduct(){
    this.store.pipe(select(selector.CheckLimit)).subscribe((result: any) => {
      if (result==false) {
        this.store.dispatch(new fromActions.GetProductList(this.PageNumber,this.PageSize));
        this.GetProducts();
      }
    })

  }
  

  RefreshProducts(){
    this.service.GetAll(this.PageNumber,this.PageSize).subscribe(res=>{
      if(res["message"]=="nodata"){
        this.PageNumber=this.PageNumber-1;
        this.notification.Delete("No More Products")
      }
      else{
        this.temp=res;
        this.Products.push(...this.temp);
        console.log(this.Products)
      }
      
    })
  }

  NoCategory(){
    this.categoryselected=false;
    this.products=[];
    this.PageNumber=1;
    this.GetProducts();
  }

  Clear(){
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

  AddtoCart(data){
    // this.service.AddtoCart(data).subscribe(res=>{
    //  if(res["message"]=="exist"){
    //    this.notification.Delete("Product already added");
    //  }
    //  else{
    //   this.notification.update("Product Added to cart");
    //   this.home.GetCount();
    //  }
     
    // })
    this.store.dispatch(new fromActions.AddToCart(data));
    this.home.GetCount();
   
  }

  GetProductsByCategory(data){
    this.categoryselected=true;
    console.log(this.selected)
    this.service.GetProductsByCategory(data).subscribe(res=>{
      this.products=[];
      this.temp=res;
      this.products.push(...this.temp)
     
    })
  }

  Detail(Id){
    this.router.navigate(['/home/detail/',Id]);

  }

  BuyNow(Id){
    this.router.navigate(['/home/buy/',Id]);
  }

  Removefromwishlist(data,index){

    this.products[index].isWishListItem = false;
    this.notification.Delete("Removed from wishlist");
    this.store.dispatch(new fromActions.RemoveFromWishlist(this.products,data));
    //this.GetProducts();
    // this.wishlistservice.RemoveFromWishlist(data).subscribe(res=>{
     
    // })
  }

  AddToWishlist(data,index){
    console.log(data);
    this.notification.update("Added to wishlist");
    this.products[index].isWishListItem = true;
    this.store.dispatch(new fromActions.AddToWishlist(this.products,data));

   // this.GetProducts();

    // this.wishlistservice.AddToWishlist(data).subscribe(res=>{
    //   console.log("added to wishlist");
    //   this.notification.update("Added to wishlist");
    //   this.products[index].isWishListItem = true; 
    // })
  }






  
@HostListener("document:scroll")


  scrollfunction() {
    //In chrome and some browser scroll is given to body tag
 
   
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page

      if(this.categoryselected==false){
        console.log(this.PageNumber)
        this.store.pipe(select(selector.CheckLimit)).subscribe((result: any) => {
          if (result==false) {
            this.PageNumber=this.PageNumber+1;

            //this.RefreshProducts();
            this.loadProduct()
      
          }
        })

      }

    
      }


    }
    
}
