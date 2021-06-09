import { createAction, createReducer, on, props } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { Product } from "@spartacus/core";

export interface State extends AppState.State {
  productsModal: ProductState;
}

export interface ProductState {
  showProductModal: boolean;
  nameProduct: string;
  image: any;
  price: number;
}

export const productReducer =  createReducer<any>(
  {} as any,
  on( createAction('[Product] Add Product Modal', props<any>()), (state, {currentProduct, nameProduct, image, price}) => {
    return {
      ...state,
      [currentProduct]: {
        showProductModal: !state.showProductModal,
        nameProduct: nameProduct,
        image: image,
        price: price
      }
    };
  }),
  on( createAction('[Product] Remove Product Modal', props<{currentProduct: number}>()), (state, {currentProduct}) => {
    const {[currentProduct]:_, ...newObject} = state;
    return {
      ...newObject
    };
  })
);
