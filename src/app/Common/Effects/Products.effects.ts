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



@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private wishlistservice:WishlistService,
        private router: Router,
        private notification:NotificationService,
        private orderservice:OrderService
      
      
        
      ) {}

    GetProductList$=createEffect(()=>
      this.actions$.pipe(
   
        ofType(fromProductActions.ProductActionTypes.GetProductList),
      
        mergeMap(action=>
          this.productService.GetAll(action.pageNumber,action.pageSize).pipe(
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


    GetCartList$=createEffect(()=>
      this.actions$.pipe(
  
        ofType(fromProductActions.ProductActionTypes.GetCartList),
      
        mergeMap(action=>
          this.productService.GetCartItems().pipe(
              map((CartItems:any[])=>{
              
                console.log(CartItems)
                  return new fromProductActions.GetCartListSuccess(CartItems);
              }),
              catchError(()=>of(new fromProductActions.GetCartListFailure())),
          ),
        ),
      )
    );


    AddtoWishlist$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.AddToWishlist),
        switchMap((action)=>
          this.wishlistservice.AddToWishlist(action.productId).pipe(
              map((result)=>{
              
                console.log(result);
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
          this.wishlistservice.RemoveFromWishlist(action.productId).pipe(
              map((result)=>{
              
                console.log(result);
                  return new fromProductActions.GetState();
              }),
          ),
        ),
      )
    );

    AddToCart$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.AddToCart),
        switchMap((action)=>
          this.productService.AddtoCart(action.productId).pipe(
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


    GetProductById$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetProductById),
        switchMap((action)=>
          this.productService.GetProductById(action.productId).pipe(
              map((result:Product)=>{
              
                console.log(result);
                return new fromProductActions.GetProductByIdSuccess(result);
              }),
          ),
        ),
      )
    );

    UpdateCart$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.UpdateCart),
        switchMap((action)=>
          this.productService.UpdateCart(action.cartId,action.qty).pipe(
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
          this.productService.RemoveFormCart(action.cartId).pipe(
              map((result)=>{
              
                console.log(result);
                return new fromProductActions.GetCartList();
              }),
          ),
        ),
      )
    );

    GetOrderList$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetOrderList),
        switchMap((action)=>
          this.orderservice.GetAll().pipe(
              map((result:any[])=>{
              
                console.log(result);
                return new fromProductActions.GetOrderListSuccess(result);
              }),
          ),
        ),
      )
    );

    GetCartCount$=createEffect(()=>
      this.actions$.pipe(
        ofType(fromProductActions.ProductActionTypes.GetCartCount),
        switchMap((action)=>
          this.productService.GetCount().pipe(
              map((result)=>{
              
                console.log(result);
                return new fromProductActions.GetCartCountSuccess(result);
              }),
          ),
        ),
      )
    );

}
