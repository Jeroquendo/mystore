import { createAction, createReducer, on, props } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { Product } from "@spartacus/core";

export interface State extends AppState.State {
  productsModal: ProductState;
}

export interface ProductState {
  showProductModal: boolean;

}

export const productReducer =  createReducer<any>(
  {} as any,
  on( createAction('[Product] Add Product Modal', props<{currentProduct: number}>()), (state, {currentProduct}) => {
    return {
      ...state,
      [currentProduct]: {
        showProductModal: !state.showProductModal
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
