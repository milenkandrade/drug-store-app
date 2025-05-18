import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";
import Category from "../../models/category";

export const alertsFeatureKey = 'categories';

interface State {
  categories: Category[],
  isLoadingCategories: boolean,
  errorAPICategories: string ,
}

const initialState: State = {
  categories: [],
  isLoadingCategories: false,
  errorAPICategories: '',
}

export const alertsPageActions = createActionGroup({
  source: 'categories page',
  events: {
    load: emptyProps()
  }
})

export const {load} = alertsPageActions;

export const alertsAPIActions = createActionGroup({
  source: 'categories API',
  events: {
    loadCategoriesSuccess: props<{ categories: Category[] }>(),
    loadCategoriesFailure: props<{ errorAPICategories: string }>(),
  }
})

export const { loadCategoriesSuccess, loadCategoriesFailure } = alertsAPIActions;

export const CategoriesReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingCategories: true })),
  on(loadCategoriesSuccess,
    (state, { categories }) => ({ ...state, categories, isLoadingBrands: false })),
  on(loadCategoriesFailure,
    (state, { errorAPICategories }) => ({ ...state, errorAPICategories, isLoadingBrands: false })),
)

export const categoriesFeature = createFeature({
  name: alertsFeatureKey,
  reducer: CategoriesReducer,
})

export const {
  name,
  reducer,
  selectCategories,
  selectCategoriesState,
  selectErrorAPICategories,
  selectIsLoadingCategories,
} = categoriesFeature
