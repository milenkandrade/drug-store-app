import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

export const invoicesFeatureKey = 'invoices';

interface State {
  invoices: string[],
  isLoadingInvoices: boolean,
  errorAPIInvoices: string ,
}

const initialState: State = {
  invoices: [],
  isLoadingInvoices: false,
  errorAPIInvoices: '',
}

export const invoicesPageActions = createActionGroup({
  source: 'invoices page',
  events: {
    load: emptyProps()
  }
})

export const {load} = invoicesPageActions;

export const invoicesAPIActions = createActionGroup({
  source: 'invoices API',
  events: {
    loadInvoicesSuccess: props<{ invoices: string[] }>(),
    loadInvoicesFailure: props<{ errorAPIInvoices: string }>(),
  }
})

export const { loadInvoicesSuccess, loadInvoicesFailure } = invoicesAPIActions;

export const InvoicesReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingInvoices: true })),
  on(loadInvoicesSuccess,
    (state, { invoices }) => ({ ...state, invoices, isLoadingBrands: false })),
  on(loadInvoicesFailure,
    (state, { errorAPIInvoices }) => ({ ...state, errorAPIInvoices, isLoadingBrands: false })),
)

export const invoicesFeature = createFeature({
  name: invoicesFeatureKey,
  reducer: InvoicesReducer,
})

export const {
  name,
  reducer,
  selectInvoices,
  selectInvoicesState,
  selectErrorAPIInvoices,
  selectIsLoadingInvoices,
} = invoicesFeature
