import { EnvironmentProviders, InjectionToken } from "@angular/core"
import { Action, ActionReducerMap, provideState, RootStoreConfig } from "@ngrx/store"
import { productsFeature, ProductsReducer } from "./product/product.state"
import { categoriesFeature, CategoriesReducer } from "./category/category.state"
import { alertsFeature, AlertsReducer } from "./alert/alert.state"
import { invoicesFeature, InvoicesReducer } from "./invoice/invoice.state"
import { suppliersFeature, SuppliersReducer } from './supplier/supplier.state';
import { provideEffects } from "@ngrx/effects"

import * as AlertsEffects from './alert/alert.effects';
import * as CategoriesEffects from '../store/category/category.effects';
import * as InvoicesEffects from './invoice/invoice.effects';
import * as ProductsEffects from '../store/product/product.effects';
import * as SuppliersEffects  from './supplier/supplier.effects';

export const reducers: ActionReducerMap<unknown, Action<string>> | InjectionToken<ActionReducerMap<unknown, Action<string>>> = {
  alerts: AlertsReducer,
  categories: CategoriesReducer,
  invoices: InvoicesReducer,
  products: ProductsReducer,
  suppliers: SuppliersReducer
}

export const states: EnvironmentProviders[] = [
  provideState(alertsFeature),
  provideState(categoriesFeature),
  provideState(invoicesFeature),
  provideState(productsFeature),
  provideState(suppliersFeature)
]

export const effects: EnvironmentProviders[] = [
  provideEffects([
    AlertsEffects,
    CategoriesEffects,
    InvoicesEffects,
    ProductsEffects,
    SuppliersEffects
  ]),
]

export const storeConfig: RootStoreConfig<unknown, Action<string>> = {
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
    strictStateSerializability: true,
    strictActionSerializability: true,
    strictActionWithinNgZone: true,
  },
}
