import { Component, OnInit } from '@angular/core';

import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    private store:Store<ProductState>
  ) { }

  wishlistItems:any;
  showComponent:boolean=false;
  commonData:any;

  ngOnInit(): void {

    this.store.pipe(select(selector.CommonData)).subscribe(res=>{
      if(res!=null){
        this.commonData=res;
      }
    })



    this.store.dispatch(new fromActions.GetWishListItems());
    this.store.pipe(select(selector.WishlistItems)).subscribe(res=>{
      if(res!=null){
        this.wishlistItems=res;
        if(this.wishlistItems.length>0){
          this.showComponent=true;
        }
        
        console.log(res)
      }
      
    })
  }

  delete(id){
    console.log("wishlist Id:"+ id)
    this.store.dispatch(new fromActions.RemoveFromWishlist(id));
  }

  addToCart(id){
    this.store.dispatch(new fromActions.AddToCart(id));
    this.store.dispatch(new fromActions.RemoveFromWishlist(id));
  }

}
