import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProduct from '../Common/Reducer/Product.reducer';
import * as ProductActions from '../Common/Actions/Product.actions';
import * as fromRoot from '../Common/Store/app-state';
import { state } from '@angular/animations';


// Extends the app state to include the navigation feature.
// export interface State extends AppState {
//   reports: fromProduct.ProductState;
// }

export interface State extends fromRoot.AppState {
  reports: fromProduct.ProductState;
}

// Selector functions
export const getProductFeatureState = createFeatureSelector<fromProduct.ProductState>(fromProduct.productsFeatureKey);


export const GetProductList = createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState) => state.products,
);

export const GetCartItems=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.cartItems
);



export const GetProductById=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.product
)

export const CheckLimit=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.limitreached
)

export const OrderList =createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.orderList
)

export const CartCount=createSelector(
  getProductFeatureState,
  (state:fromProduct.ProductState)=>state.cartCount
)
export const reducer=fromProduct.reducer;
export const actions=ProductActions;
