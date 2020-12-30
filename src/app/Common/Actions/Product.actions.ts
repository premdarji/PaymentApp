
import { Action } from '@ngrx/store';
import {createAction,props} from '@ngrx/store';
import { error } from 'protractor';

import {Product} from 'src/app/models/Product.model';

export enum ProductActionTypes {


//methods related to products    
GetProductList="[Product] GetProduct",
GetProductListSuccess="[ProductListSucces] GetSuccess",
GetProductListFailure="[ProductListFailure] GetFailure",

GetProductById="[ProductById] Get",
GetProductByIdSuccess="[ProductSuccess] GetSuccess",
GetProductByIdFailure="[ProductFailure] GetFailure",



//methods related to category

GetCategories="[Categories] Get",
GetCategoriesSuccess="[Categories] Success",

AddCategory="[Category] Add",
UpdateCategory="[Category] Update",

DeleteCategory="[Category] Delete",


//methods related to wishlist
AddToWishlist="[Wishlist] Add",
RemoveFromWishlist="[Wishlist] Remove",


//methods related to cart
AddToCart="[Cart] Add",
AddToCartSuccess="[CartSuccess] AddSuccess",
AddToCartFailure="[CartFailure] AddFailure",

GetCartList="[CartList] GetCart",
GetCartListSuccess="[CartListSuccess] GetSuccess",
GetCartListFailure="[CartListFailure] GetFailure",

UpdateCart="[Update] Cart",
RemoveFromCart="[Cart] Remove",

GetCartCount="[CartCount] Get",
GetCartCountSuccess="[CartCount] GetSuccess",




GetState="[State] GetState",



//methods related to order
CreateOrder="[Order] Create",
CreateOrderSuccess="[Order] Success",
CreateOrderDetails="[Order] Details",

GetOrderList="[OrderList] Get",
GetOrderListSuccess="[OrderListSuccess] GetSuccess",

GetOrderById="[OrderById] Get",
GetOrderByIdSuccess="[OrderSuccess] GetSuccess",
GetOrderByIdFailure="[OrderFailure] GetFailure",

CancelOrder="[Cancel] Order",


//methods related to translation
GetCommonFields="[GetCommon] Get",
GetCommonFieldsSuccess="[GetCommon] GetSuccess"

}

//methods related to user




//methods for products
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


export class GetProductById implements Action{
    readonly type=ProductActionTypes.GetProductById;
    constructor(public productId:number){};
}

export class GetProductByIdSuccess implements Action{
    readonly type=ProductActionTypes.GetProductByIdSuccess;
    constructor(public product:Product){};
}



//methods for cart
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


export class UpdateCart implements Action{
    readonly type=ProductActionTypes.UpdateCart;
    constructor(public cart:any[],public cartId:number,public qty:number){}
}


export class RemoveFromCart implements Action {
    readonly type=ProductActionTypes.RemoveFromCart;
    constructor(public cartId:number){}
}

export class GetCartCount implements Action{
    readonly type=ProductActionTypes.GetCartCount;
}

export class GetCartCountSuccess implements Action{
    readonly type=ProductActionTypes.GetCartCountSuccess;
    constructor(public count:any){};
}

//methods for wishlist
export class AddToWishlist implements Action{
    readonly type =ProductActionTypes.AddToWishlist;
    constructor(public product:Product[] ,public productId:number){}
}

export class RemoveFromWishlist implements Action{
    readonly type=ProductActionTypes.RemoveFromWishlist;
    constructor(public product:Product[],public productId:number){}
}




export class GetState implements Action{
    readonly type=ProductActionTypes.GetState;
}



//methods of order
export class GetOrderList implements Action{
    readonly type=ProductActionTypes.GetOrderList;
}

export class GetOrderListSuccess implements Action{
    readonly type=ProductActionTypes.GetOrderListSuccess;
    constructor(public orders:any[]){};
}

export class GetOrderById implements Action{
    readonly type=ProductActionTypes.GetOrderById;
    constructor(public OrderId:number){};
}

export class GetOrderByIdSuccess implements Action{
    readonly type=ProductActionTypes.GetOrderByIdSuccess;
    constructor(public OrderDetail:any){};
}


export class CancelOrder implements Action{
    readonly type=ProductActionTypes.CancelOrder;
    constructor(public Order:any){};
}

export class CreateOrder implements Action{
    readonly type=ProductActionTypes.CreateOrder;
    constructor(public Order:any){};

}

export class CreateOrderSuccess implements Action{
    readonly type=ProductActionTypes.CreateOrderSuccess;
    constructor(public OrderId:number){};
}

export class CreateOrderDetails implements Action{
    readonly type =ProductActionTypes.CreateOrderDetails;
    constructor(public OrderDetails:any){};
}

//methods of translation
export class GetCommonFields implements Action{
    readonly type=ProductActionTypes.GetCommonFields;
    constructor(public data:string){};
}

export class GetCommonFieldsSuccess implements Action{
    readonly type=ProductActionTypes.GetCommonFieldsSuccess;
    constructor(public CommonFields:any){};
}


//methods of category

export class GetCategories implements Action{
    readonly type=ProductActionTypes.GetCategories;
    constructor(){};
}

export class GetCategoriesSuccess implements Action{
    readonly type=ProductActionTypes.GetCategoriesSuccess;
    constructor(public Categories:any){};
}

export class DeleteCategory implements Action{
    readonly type=ProductActionTypes.DeleteCategory;
    constructor(public CategoryId:number){};
}
export class AddCategory implements Action{
    readonly type=ProductActionTypes.AddCategory;
    constructor(){};
}

export class UpdateCategory implements Action{
    readonly type=ProductActionTypes.UpdateCategory;
    constructor(){};
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
GetOrderById|
GetOrderByIdSuccess|
CancelOrder|
GetCategories|
GetCategoriesSuccess|
DeleteCategory|
AddCategory|
UpdateCategory|
CreateOrder|
CreateOrderDetails|
CreateOrderSuccess|
GetState;
    


