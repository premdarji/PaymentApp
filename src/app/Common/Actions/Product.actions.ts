
import { Action } from '@ngrx/store';
import {createAction,props} from '@ngrx/store';
import { error } from 'protractor';

import {Product} from 'src/app/models/Product.model';

export enum ProductActionTypes {

GetProductList="[Product] GetProduct",
GetProductListSuccess="[ProductListSucces] GetSuccess",
GetProductListFailure="[ProductListFailure] GetFailure",



AddToWishlist="[Wishlist] Add",
RemoveFromWishlist="[Wishlist] Remove",

AddToCart="[Cart] Add",
AddToCartSuccess="[CartSuccess] AddSuccess",
AddToCartFailure="[CartFailure] AddFailure",



GetCartList="[CartList] GetCart",
GetCartListSuccess="[CartListSuccess] GetSuccess",
GetCartListFailure="[CartListFailure] GetFailure",

GetProductById="[ProductById] Get",
GetProductByIdSuccess="[ProductSuccess] GetSuccess",
GetProductByIdFailure="[ProductFailure] GetFailure",


GetState="[State] GetState",

UpdateCart="[Update] Cart",
RemoveFromCart="[Cart] Remove",

GetOrderList="[OrderList] Get",
GetOrderListSuccess="[OrderListSuccess] GetSuccess",

GetCartCount="[CartCount] Get",
GetCartCountSuccess="[CartCount] GetSuccess",


GetCommonFields="[GetCommon] Get",
GetCommonFieldsSuccess="[GetCommon] GetSuccess"

}

export class GetProductList implements Action{

    readonly type=ProductActionTypes.GetProductList;
     constructor(public pageNumber:number, public pageSize:number){}
}

export class GetProductListSuccess implements Action{
    readonly type=ProductActionTypes.GetProductListSuccess;
    constructor(public payload:Product[]){}
}

export class GetProductListFailure implements Action{
    readonly type=ProductActionTypes.GetProductListFailure;
    
}

export class GetCartList implements Action{
    readonly type=ProductActionTypes.GetCartList;
}

export class GetCartListSuccess implements Action{
    readonly type=ProductActionTypes.GetCartListSuccess;
    constructor(public payload:any[]){}
}

export class GetCartListFailure implements Action{
    readonly type=ProductActionTypes.GetCartListFailure;
}

export class AddToWishlist implements Action{
    readonly type =ProductActionTypes.AddToWishlist;
    constructor(public product:Product[] ,public productId:number){}
}

export class RemoveFromWishlist implements Action{
    readonly type=ProductActionTypes.RemoveFromWishlist;
    constructor(public product:Product[],public productId:number){}
}

export class AddToCart implements Action{
    readonly type=ProductActionTypes.AddToCart;
    constructor(public productId:number){};
}


export class AddToCartSuccess implements Action{
    readonly type=ProductActionTypes.AddToCartSuccess;
}

export class AddToCartFailure implements Action{
    readonly type=ProductActionTypes.AddToCartFailure;
}


export class GetProductById implements Action{
    readonly type=ProductActionTypes.GetProductById;
    constructor(public productId:number){};
}

export class GetProductByIdSuccess implements Action{
    readonly type=ProductActionTypes.GetProductByIdSuccess;
    constructor(public product:Product){};
}

export class GetState implements Action{
    readonly type=ProductActionTypes.GetState;
}

export class UpdateCart implements Action{
    readonly type=ProductActionTypes.UpdateCart;
    constructor(public cart:any[],public cartId:number,public qty:number){}
}


export class RemoveFromCart implements Action {
    readonly type=ProductActionTypes.RemoveFromCart;
    constructor(public cartId:number){}
}

export class GetOrderList implements Action{
    readonly type=ProductActionTypes.GetOrderList;
}

export class GetOrderListSuccess implements Action{
    readonly type=ProductActionTypes.GetOrderListSuccess;
    constructor(public orders:any[]){};
}

export class GetCartCount implements Action{
    readonly type=ProductActionTypes.GetCartCount;
}

export class GetCartCountSuccess implements Action{
    readonly type=ProductActionTypes.GetCartCountSuccess;
    constructor(public count:any){};
}


export class GetCommonFields implements Action{
    readonly type=ProductActionTypes.GetCommonFields;
    constructor(public data:string){};
}

export class GetCommonFieldsSuccess implements Action{
    readonly type=ProductActionTypes.GetCommonFieldsSuccess;
    constructor(public CommonFields:any){};
}

export type ProductActions=
GetProductList|
GetProductListSuccess|
GetProductListFailure|
GetCartList|
GetCartListSuccess|
GetCartListFailure|
AddToCart|
RemoveFromCart|
AddToWishlist|
RemoveFromWishlist|
GetProductById|
GetProductByIdSuccess|
UpdateCart|
GetOrderList|
GetOrderListSuccess|
GetCartCount|
GetCartCountSuccess|
GetCommonFields|
GetCommonFieldsSuccess|
GetState;
    


