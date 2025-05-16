import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

export const suppliersFeatureKey = 'suppliers';

interface State {
  suppliers: string[],
  isLoadingSuppliers: boolean,
  errorAPISuppliers: string ,
}

const initialState: State = {
  suppliers: [],
  isLoadingSuppliers: false,
  errorAPISuppliers: '',
}

export const suppliersPageActions = createActionGroup({
  source: 'suppliers page',
  events: {
    load: emptyProps()
  }
})

export const {load} = suppliersPageActions;

export const suppliersAPIActions = createActionGroup({
  source: 'suppliers API',
  events: {
    loadSuppliersSuccess: props<{ suppliers: string[] }>(),
    loadSuppliersFailure: props<{ errorAPISuppliers: string }>(),
  }
})

export const { loadSuppliersSuccess, loadSuppliersFailure } = suppliersAPIActions;

export const SuppliersReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingSuppliers: true })),
  on(loadSuppliersSuccess,
    (state, { suppliers }) => ({ ...state, suppliers, isLoadingBrands: false })),
  on(loadSuppliersFailure,
    (state, { errorAPISuppliers }) => ({ ...state, errorAPISuppliers, isLoadingBrands: false })),
)

export const suppliersFeature = createFeature({
  name: suppliersFeatureKey,
  reducer: SuppliersReducer,
})

export const {
  name,
  reducer,
  selectSuppliers,
  selectSuppliersState,
  selectErrorAPISuppliers,
  selectIsLoadingSuppliers,
} = suppliersFeature
