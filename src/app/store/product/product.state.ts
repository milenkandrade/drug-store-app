import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

export const productsFeatureKey = 'products';

interface State {
  products: string[],
  isLoadingProducts: boolean,
  errorAPIProducts: string ,
}

const initialState: State = {
  products: [],
  isLoadingProducts: false,
  errorAPIProducts: '',
}

export const productsPageActions = createActionGroup({
  source: 'products page',
  events: {
    load: emptyProps()
  }
})

export const {load} = productsPageActions;

export const productsAPIActions = createActionGroup({
  source: 'products API',
  events: {
    loadProductsSuccess: props<{ products: string[] }>(),
    loadProductsFailure: props<{ errorAPIProducts: string }>(),
  }
})

export const { loadProductsSuccess, loadProductsFailure } = productsAPIActions;

export const ProductsReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingProducts: true })),
  on(loadProductsSuccess,
    (state, { products }) => ({ ...state, products, isLoadingBrands: false })),
  on(loadProductsFailure,
    (state, { errorAPIProducts }) => ({ ...state, errorAPIProducts, isLoadingBrands: false })),
)

export const productsFeature = createFeature({
  name: productsFeatureKey,
  reducer: ProductsReducer,
})

export const {
  name,
  reducer,
  selectProducts,
  selectProductsState,
  selectErrorAPIProducts,
  selectIsLoadingProducts,
} = productsFeature
