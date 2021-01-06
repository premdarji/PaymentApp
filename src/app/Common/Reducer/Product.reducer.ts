
import { createFeatureSelector } from '@ngrx/store';
import {Product} from 'src/app/models/Product.model';
import {ProductActionTypes,ProductActions} from '../Actions/Product.actions';
import { stat } from 'fs';
 
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
    OrderItemById:any;
    Categories:any[];
    orderId:number;
    productsGuest:any[];
    isLooggedIn:boolean;
    mailSent:boolean;
    loading:boolean

}

export const initialState :ProductState={
    products:[],
    error:[],
    cartItems:[],
    product:null,
    limitreached:false,
    orderList:[],
    cartCount:0,
    CommonFields:null,
    OrderItemById:null,
    Categories:[],
    orderId:0,
    productsGuest:[],
    isLooggedIn:false,
    mailSent:false,
    loading:true
    

}


export function reducer(state = initialState, action:ProductActions ): ProductState {
  // debugger
    switch (action.type) {
  
        //cases of product
        case ProductActionTypes.GetProductList:
            return { ...state, };
            
        case ProductActionTypes.GetProductListSuccess:
            //state.temp=action.payload;
            state.products.push(...action.payload);

            return{...state,products:state.products};

        case ProductActionTypes.GetProductListFailure:

            return{...state,limitreached:true};
        
        case ProductActionTypes.GetProductById:
        
            return {...state,product:null};
        
        case ProductActionTypes.GetProductByIdSuccess:
            
            return{...state,product:action.product};
        
        case ProductActionTypes.GetAllProductsGuest:
            return { ...state};
        case ProductActionTypes.GetAllProductsGuestSuccess:
            return { ...state,productsGuest:action.products};

        case ProductActionTypes.AddProduct:
            return { ...state};
        case ProductActionTypes.DeleteProduct:
            return{...state};
        case ProductActionTypes.UpdateProduct:
            return{...state};
        //cases of cart
        case ProductActionTypes.GetCartList:
            return{...state,cartItems:null};
        
        case ProductActionTypes.GetCartListSuccess:
            return{...state,cartItems:action.payload};
        
        case ProductActionTypes.GetCartListFailure:
            return {...state};
        case ProductActionTypes.AddToCart:
            return{...state};
        case ProductActionTypes.UpdateCart:
            //state.cartItems=[];
            return{...state,cartItems:null};
        
        case ProductActionTypes.RemoveFromCart:
                    
            return {...state};
        case ProductActionTypes.GetCartCount:
            return {...state};    
        
        case ProductActionTypes.GetCartCountSuccess:
            return { ...state,cartCount:action.count}; 
        

        //cases of wishlist    
         case ProductActionTypes.AddToWishlist:

            return{...state,products:action.product};
            
        
         case ProductActionTypes.RemoveFromWishlist:
            return{...state,products:action.product};

        //cases for order
         case ProductActionTypes.GetOrderList:
            return {...state};

         case ProductActionTypes.GetOrderListSuccess:
            return {...state,orderList:action.orders};

         case ProductActionTypes.GetOrderById:
            return {...state,OrderItemById:null};

         case ProductActionTypes.GetOrderByIdSuccess:
            return { ...state,OrderItemById:action.OrderDetail};
        
         case ProductActionTypes.CancelOrder:
            return { ...state};
        
        case ProductActionTypes.CreateOrder:
            return{ ...state};

        case ProductActionTypes.CreateOrderSuccess:
            return { ...state,orderId:action.OrderId};

        case ProductActionTypes.CreateOrderDetails:
            return {...state};
           
        case ProductActionTypes.GetState:
            return{...state};

        case ProductActionTypes.SendEmail:
            return{...state};    

        case ProductActionTypes.SendEmailSuccess:
            return{...state, mailSent:action.status};   

        //cases of translation
        case ProductActionTypes.GetCommonFields:
            return {...state};

        case ProductActionTypes.GetCommonFieldsSuccess:
            return {...state,CommonFields:action.CommonFields};

        //cases of category    

        case ProductActionTypes.GetCategories:
            return {...state};

        case ProductActionTypes.GetCategoriesSuccess:
            return {...state,Categories:action.Categories};
        
        case ProductActionTypes.DeleteCategory:
            return {...state};
        case ProductActionTypes.AddCategory:
            return {...state};
        case ProductActionTypes.UpdateCategory:
            return{...state};

        //cases of user

        case ProductActionTypes.LogInUser:
            return {...state};
        
        case ProductActionTypes.LogInUserSuccess:
            return {...state,isLooggedIn:true};
        
        case ProductActionTypes.CheckLogInStatus:
            return { ...state};

        case ProductActionTypes.CheckLogInStatusSuccess:
            return{...state,isLooggedIn:true};

        case ProductActionTypes.CheckLogInStatusFailure:
            return {...state,isLooggedIn:false};
            
        default:
            return {...state};
       
            
    }
}
    
  
      