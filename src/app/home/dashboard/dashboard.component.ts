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
  hoverIndex:number;
  returnUrl:string;
  annonymousUser=0;
  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  

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
      this.store.dispatch(new fromActions.GetCartCount())
    }
    else{
      var items=[];
      items= JSON.parse(sessionStorage.getItem("cart"))
      console.log(items)
      if(items==null){
        items=[];
        items.push(data)
        sessionStorage.setItem("cart",JSON.stringify(items));
      }
      else{
        if(!items.includes(data)){
          this.notification.update("Item added to cart")
          items.push(data);
          sessionStorage.setItem("cart",JSON.stringify(items));
         
        }
        else{
          this.notification.Delete("Item already added");
        }

      }
     
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
      this.returnUrl='/home/buy/'+Id;
      console.log(this.returnUrl)
      this.login(this.returnUrl)
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

  login(returnUrl:string){

    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="40%";
    dialogconfig.data=returnUrl;
    this.dialog.open(LoginComponent,dialogconfig);

  }

  hover(id)
  {
    //console.log("on hover :"+id)
    this.hoverIndex=id;
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
