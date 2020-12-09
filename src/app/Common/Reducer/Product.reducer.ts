
import { createFeatureSelector } from '@ngrx/store';
import {Product} from 'src/app/models/Product.model';
import {ProductActionTypes,ProductActions} from '../Actions/Product.actions';
 
//export const productsFeatureKey = "products";
//export const getProductFeatureState = createFeatureSelector<ProductState>('myproduct');

export const productsFeatureKey = "myproduct";


export interface ProductState{
    products:Product[],
    error:any[];
    cartItems:any[],
    product:Product,
    limitreached:boolean,
    orderList:any[],
    cartCount:number,
    CommonFields:any;

}

export const initialState :ProductState={
    products:[],
    error:[],
    cartItems:[],
    product:null,
    limitreached:false,
    orderList:[],
    cartCount:0,
    CommonFields:null

}


export function reducer(state = initialState, action:ProductActions ): ProductState {

    switch (action.type) {
  
        case ProductActionTypes.GetProductList:
            return { ...state };
            
        case ProductActionTypes.GetProductListSuccess:
            //state.temp=action.payload;
            state.products.push(...action.payload);

            return{...state,products:state.products};

        case ProductActionTypes.GetProductListFailure:

            return{...state,limitreached:true};

        case ProductActionTypes.GetCartList:
            return{...state};
        
        case ProductActionTypes.GetCartListSuccess:
            return{...state,cartItems:action.payload};
        
        case ProductActionTypes.GetCartListFailure:
            return {...state};

        case ProductActionTypes.AddToWishlist:

            return{...state,products:action.product};
            
        
        case ProductActionTypes.RemoveFromWishlist:
            return{...state,products:action.product};

        case ProductActionTypes.AddToCart:
            return{...state};

        case ProductActionTypes.GetProductById:
            return {...state};

        case ProductActionTypes.GetProductByIdSuccess:
            return{...state,product:action.product};

        case ProductActionTypes.UpdateCart:
            return{...state,cartItems:action.cart};

        case ProductActionTypes.RemoveFromCart:
            
            return {...state};

        case ProductActionTypes.GetOrderList:
            return {...state};

        case ProductActionTypes.GetOrderListSuccess:
            return {...state,orderList:action.orders};

        case ProductActionTypes.GetCartCount:
            return {...state};    

        case ProductActionTypes.GetCartCountSuccess:
            return { ...state,cartCount:action.count};    
        case ProductActionTypes.GetState:
            return{...state};


        case ProductActionTypes.GetCommonFields:
            return {...state};

        case ProductActionTypes.GetCommonFieldsSuccess:
            return {...state,CommonFields:action.CommonFields};

        default:
            return {...state};
        
    }
}
    
  
      