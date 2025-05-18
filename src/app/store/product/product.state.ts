import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";
import Product from "../../models/product";
import Pageable from "../../models/pageable";
import Page from "../../models/page";

export const productsFeatureKey = 'products';

interface State {
  products: Page<Product>,
  selectedPageable: Pageable,
  isLoadingProducts: boolean,
  errorAPIProducts: string ,
}

const initialState: State = {
  products: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
  },
  selectedPageable: { size: 10, page: 1 },
  isLoadingProducts: false,
  errorAPIProducts: '',
}

export const productsPageActions = createActionGroup({
  source: 'products page',
  events: {
    load: emptyProps(),
    setSelectedPageable: props<{ pageable: Pageable }>(),
  }
})

export const { load, setSelectedPageable } = productsPageActions;

export const productsAPIActions = createActionGroup({
  source: 'products API',
  events: {
    loadProductsSuccess: props<{ products: Page<Product> }>(),
    loadProductsFailure: props<{ errorAPIProducts: string }>(),
  }
})

export const { loadProductsSuccess, loadProductsFailure } = productsAPIActions;

export const ProductsReducer = createReducer(
  initialState,
  on(load, (state) => ({ ...state, isLoadingProducts: true })),
  on(setSelectedPageable, (state, { pageable }) =>
    ({ ...state, selectedPageable: { ...state.selectedPageable, pageable } })),

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
  selectSelectedPageable
} = productsFeature
