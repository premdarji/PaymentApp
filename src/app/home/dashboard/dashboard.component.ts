import { Component, Directive, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProductService } from 'src/app/shared/product.service';
import { WishlistService } from 'src/app/shared/wishlist.service';
import { HomeComponent } from '../home.component';





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
    private home:HomeComponent) { }

  Products:any[]=[];
  filter:any;
  selected="";
  wishlist:any[]=[];
  temp:any;
  PageNumber=1;
  PageSize=6;
  

  ngOnInit(): void {
    this.RefreshProducts();  

  
  
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
    this.Products=[];
    this.PageNumber=1;
    this.RefreshProducts();
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
    this.service.AddtoCart(data).subscribe(res=>{
     if(res["message"]=="exist"){
       this.notification.Delete("Product already added");
     }
     else{
      this.notification.update("Product Added to cart");
      this.home.GetCount();
     }
     
    })
   
  }

  GetProductsByCategory(){
    console.log(this.selected)
    this.service.GetProductsByCategory(this.selected).subscribe(res=>{
      this.Products=[];
      this.temp=res;
      this.Products.push(...this.temp)
     
    })
  }

  Detail(Id){
    this.router.navigate(['/home/detail/',Id]);

  }

  BuyNow(Id){
    this.router.navigate(['/home/buy/',Id]);
  }

  Removefromwishlist(data,index){
    this.wishlistservice.RemoveFromWishlist(data).subscribe(res=>{
      this.Products[index].isWishListItem = false;
      this.notification.Delete("Removed from wishlist");
    })
  }

  AddToWishlist(data,index){
    console.log(data);
    this.wishlistservice.AddToWishlist(data).subscribe(res=>{
      console.log("added to wishlist");
      this.notification.update("Added to wishlist");
      this.Products[index].isWishListItem = true;
    })
  }






  
@HostListener("document:scroll")


  scrollfunction() {
    //In chrome and some browser scroll is given to body tag
 
   
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page

      this.PageNumber=this.PageNumber+1;

      this.RefreshProducts();
      }


    }
    
}
