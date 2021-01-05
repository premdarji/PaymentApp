import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProduct from '../Common/Reducer/Product.reducer';
import * as ProductActions from '../Common/Actions/Product.actions';
import * as fromRoot from '../Common/Store/app-state';
import { state } from '@angular/animations';
import { stat } from 'fs';


// Extends the app state to include the navigation feature.
// export interface State extends AppState {
//   reports: fromProduct.ProductState;
// }

export interface State extends fromRoot.AppState {
  reports: fromProduct.ProductState;
}

// Selector functions
export const getProductFeatureState = createFeatureSelector<fromProduct.ProductState>(fromProduct.productsFeatureKey);


//selectors related to product
export const GetProductList = createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState) => state.products,
);

export const GetProductById=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.product
)

export const CheckLimit=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.limitreached
)

export const ProductsGuest =createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.productsGuest
)

//selectors related to cart
export const GetCartItems=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.cartItems
);

export const CartCount=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.cartCount
)

//selectors realted to order
export const OrderList =createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.orderList
)

export const OrderId=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.orderId
)

export const OrderById=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.OrderItemById
)

export const MailSent=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.mailSent
)

//selectors related to translation
export const CommonData=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.CommonFields
)

//selectors related to category

export const Categories=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.Categories
)


//selectors related to user

export const IsLoggedIn =createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.isLooggedIn
)


export const reducer=fromProduct.reducer;
export const actions=ProductActions;
