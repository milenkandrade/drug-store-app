import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

export const alertsFeatureKey = 'alerts';

interface State {
  alerts: string[],
  isLoadingAlerts: boolean,
  errorAPIAlerts: string ,
}

const initialState: State = {
  alerts: [],
  isLoadingAlerts: false,
  errorAPIAlerts: '',
}

export const alertsPageActions = createActionGroup({
  source: 'alerts page',
  events: {
    load: emptyProps()
  }
})

export const {load} = alertsPageActions;

export const alertsAPIActions = createActionGroup({
  source: 'alerts API',
  events: {
    loadAlertsSuccess: props<{ alerts: string[] }>(),
    loadAlertsFailure: props<{ errorAPIAlerts: string }>(),
  }
})

export const { loadAlertsSuccess, loadAlertsFailure } = alertsAPIActions;

export const AlertsReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingAlerts: true })),
  on(loadAlertsSuccess,
    (state, { alerts }) => ({ ...state, alerts, isLoadingBrands: false })),
  on(loadAlertsFailure,
    (state, { errorAPIAlerts }) => ({ ...state, errorAPIAlerts, isLoadingBrands: false })),
)

export const alertsFeature = createFeature({
  name: alertsFeatureKey,
  reducer: AlertsReducer,
})

export const {
  name,
  reducer,
  selectAlerts,
  selectAlertsState,
  selectErrorAPIAlerts,
  selectIsLoadingAlerts,
} = alertsFeature
