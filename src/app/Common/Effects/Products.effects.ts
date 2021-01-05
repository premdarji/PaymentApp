import { Injectable } from "@angular/core";
import { Action, select, Store } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { from, noop, Observable } from 'rxjs';
import { map, mergeMap, catchError, tap, concatMap, switchMap } from "rxjs/operators";

import {ProductService} from 'src/app/shared/product.service';

import * as fromProductActions from "../Actions/Product.actions";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Product } from 'src/app/models/Product.model';
import { ProductState } from '../Reducer/Product.reducer';
import * as selector from '../index';
import { WishlistService } from 'src/app/shared/wishlist.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { OrderService } from 'src/app/shared/order.service';
import { LanguageService } from 'src/app/shared/language.service';
import { UserService } from 'src/app/shared/User';
import { AuthenticationGuard } from 'src/app/authentication.guard';
import { AuthguardService } from 'src/app/shared/authguard.service';



@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private wishlistservice:WishlistService,
        private router: Router,
        private notification:NotificationService,
        private orderservice:OrderService,
        private languageservice:LanguageService,
        private userService:UserService,
        private authguard:AuthguardService
      
      
        
      ) {}

    //effects of products
    GetProductList$=createEffect(()=>
      this.actions$.pipe(
   
        ofType(fromProductActions.ProductActionTypes.GetProductList),
      
        mergeMap(action  =>
          this.productService.getAll(action.pageNumber,action.pageSize).pipe(
              map((product:Product[])=>{
               // debugger;
                  if(product["message"]=="nodata"){
                    this.notification.Delete("No More Products")
                   return new  fromProductActions.GetProductListFailure();
                  }
                  else{
                    return new fromProductActions.GetProductListSuccess(product);
                  }
              }),
              catchError(()=>of(new fromProductActions.GetProductListFailure())),
          ),
        ),
      )
    );


    
    GetProductById$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetProductById),
        switchMap((action)=>
          this.productService.getProductById(action.productId).pipe(
              map((result:Product)=>{
                return new fromProductActions.GetProductByIdSuccess(result);
              }),
          ),
        ),
      )
    );

    GetProductsForGuest$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetAllProductsGuest),
        switchMap((action)=>
          this.productService.getAllProducts().pipe(
              map((result:any[])=>{
               //console.log(result)
                return new fromProductActions.GetAllProductsGuestSuccess(result);
              }),
          ),
        ),
      )
    );

    AddProduct$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.AddProduct),
        switchMap((action)=>
          this.productService.addProduct().pipe(
              map((result:any[])=>{
              
                return new fromProductActions.GetAllProductsGuest();
              }),
          ),
        ),
      )
    );

    
    DeleteProduct$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.DeleteProduct),
        switchMap((action)=>
          this.productService.deleteProduct(action.productId).pipe(
              map((result:any[])=>{
              
                return new fromProductActions.GetAllProductsGuest();
              }),
          ),
        ),
      )
    );

    UpdateProduct$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.UpdateProduct),
        switchMap((action)=>
          this.productService.updateProduct().pipe(
              map((result:any[])=>{
              
                return new fromProductActions.GetAllProductsGuest();
              }),
          ),
        ),
      )
    );




    //effects of cart
    GetCartList$=createEffect(()=>
      this.actions$.pipe(
  
        ofType(fromProductActions.ProductActionTypes.GetCartList),
      
        mergeMap(action=>
          this.productService.getCartItems().pipe(
              map((CartItems:any[])=>{
                  return new fromProductActions.GetCartListSuccess(CartItems);
              }),
              catchError(()=>of(new fromProductActions.GetCartListFailure())),
          ),
        ),
      )
    );


    AddToCart$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.AddToCart),
        switchMap((action)=>
          this.productService.addtoCart(action.productId).pipe(
              map((result)=>{
                if(result["message"]=="exist"){
                  this.notification.Delete("Product already added")
                }
                else{
                  this.notification.update("Product Added to cart");
                }
                console.log(result);
                return new fromProductActions.GetState();
              }),
          ),
        ),
      )
    );

    UpdateCart$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.UpdateCart),
        switchMap((action)=>
          this.productService.updateCart(action.cartId,action.qty).pipe(
              map((result)=>{
              
                console.log(result);
                return new fromProductActions.GetState();
              }),
          ),
        ),
      )
    );

    RemoveFromCart$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.RemoveFromCart),
        switchMap((action)=>
          this.productService.removeFormCart(action.cartId).pipe(
              map((result)=>{
              
      
                return new fromProductActions.GetCartList();
              }),
          ),
        ),
      )
    );


    GetCartCount$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetCartCount),
        switchMap((action)=>
          this.productService.getCount().pipe(
              map((result)=>{
              
                console.log(result);
                return new fromProductActions.GetCartCountSuccess(result);
              }),
          ),
        ),
      )
    );



    //effects of wishlist
    AddtoWishlist$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.AddToWishlist),
        switchMap((action)=>
          this.wishlistservice.addToWishlist(action.productId).pipe(
              map((result)=>{
                  return new fromProductActions.GetState();
              }),
          ),
        ),
      )
    );


    RemoveFromWishlist$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.RemoveFromWishlist),
        switchMap((action)=>
          this.wishlistservice.removeFromWishlist(action.productId).pipe(
              map((result)=>{
                  return new fromProductActions.GetState();
              }),
          ),
        ),
      )
    );

   

    


    //effect of translation        
    GetCommonFields$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetCommonFields),
        switchMap((action)=>
          this.languageservice.getData(action.data).pipe(
              map((result:any)=>{
            
                return new fromProductActions.GetCommonFieldsSuccess(result);
              }),
          ),
        ),
      )
    );

    //effects of order          
    GetOrderById$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetOrderById),
        switchMap((action)=>
          this.orderservice.getOrderDetailById(action.OrderId).pipe(
              map((result:any)=>{
                return new fromProductActions.GetOrderByIdSuccess(result);
              }),
          ),
        ),
      )
    );

    CancelOrder$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.CancelOrder),
        switchMap((action)=>
          this.orderservice.cancelOrder(action.Order).pipe(
              map((result:any)=>{
                if(result==true){
                  this.notification.Delete("Order cancelled");
                  return new fromProductActions.GetOrderList();
                }
                
              }),
          ),
        ),
      )
    );

    GetOrderList$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetOrderList),
        switchMap((action)=>
          this.orderservice.getAll().pipe(
              map((result:any[])=>{
           
                return new fromProductActions.GetOrderListSuccess(result);
              }),
          ),
        ),
      )
    );

    CreateOrder$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.CreateOrder),
        switchMap((action)=>
          this.orderservice.createOrder(action.Order).pipe(
              map((result:any)=>{
                console.log(result['id']);
                return new fromProductActions.CreateOrderSuccess(result['id']);
              }),
          ),
        ),
      )
    );

    PostOrderDetails$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.CreateOrderDetails),
        mergeMap((action)=>
          this.orderservice.postDetailOrder(action.OrderDetails).pipe(
              map((result:any)=>{
                console.log(result);
                return new fromProductActions.GetState();
              }),
          ),
        ),
      )
    );


    SendEmail$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.SendEmail),
        switchMap((action)=>
          this.orderservice.sendInvoiceMail(action.OrderId).pipe(
              map((result:any)=>{
                console.log("Result after sending mail:" +result);
                return new fromProductActions.SendEmailSuccess(result) ;
              }),
          ),
        ),
      )
    );


    //effects of category
    GetCategory$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetCategories),
        switchMap((action)=>
          this.productService.getCategory().pipe(
              map((result:any[])=>{
                return new fromProductActions.GetCategoriesSuccess(result);
              }),
          ),
        ),
      )
    );

    DeleteCategory$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.DeleteCategory),
        switchMap((action)=>
          this.productService.deleteCategory(action.CategoryId).pipe(
              map((result)=>{
                this.notification.Delete("category removed");
                return new fromProductActions.GetCategories();
              }),
          ),
        ),
      )
    );

    AddCategory$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.AddCategory),
        switchMap((action)=>
          this.productService.addCategory().pipe(
              map((result)=>{
                this.notification.success("category added");
                return new fromProductActions.GetCategories();
              }),
          ),
        ),
      )
    );

    UpdateCategory$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.UpdateCategory),
        switchMap((action)=>
          this.productService.updateCategory().pipe(
              map((result)=>{
                this.notification.update("category Updated");
                return new fromProductActions.GetCategories();
              }),
          ),
        ),
      )
    );


    //effects of user

    LogInUser$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.LogInUser),
        switchMap((action)=>
          this.userService.login(action.UserData).pipe(
              map((result)=>{
                if(result['message']=='invalid credentials'){
                 return new fromProductActions.CheckLogInStatusFailure();
                }
                localStorage.setItem("token",result["value"]);
                return new fromProductActions.LogInUserSuccess();
              }),
          ),
        ),
      )
    );

    CheckLoginStatus$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.CheckLogInStatus),
        switchMap((action)=>
          this.userService.checkLogInStatus().pipe(
              map((result)=>{
                console.log(result);
                if(result==true){
                  return new fromProductActions.CheckLogInStatusSuccess();
                }
                return new fromProductActions.CheckLogInStatusFailure();
               
              }),
          ),
        ),
      )
    );




              

   

}
