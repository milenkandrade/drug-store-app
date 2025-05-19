import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";
import Alert from "../../models/alert";
import Page from "../../models/page";
import Pageable from "../../models/pageable";

export const alertsFeatureKey = 'alerts';

interface State {
  alerts: Page<Alert>,
  selectedPageable: Pageable,
  isLoadingAlerts: boolean,
  errorAPIAlerts: string ,
}

const initialState: State = {
  alerts: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
  },
  selectedPageable: { size: 5, number: 1 },
  isLoadingAlerts: false,
  errorAPIAlerts: '',
}

export const alertsPageActions = createActionGroup({
  source: 'alerts page',
  events: {
    load: emptyProps(),
    setSelectedPageable: props<{ pageable: Pageable }>(),
  }
})

export const { load, setSelectedPageable} = alertsPageActions;

export const alertsAPIActions = createActionGroup({
  source: 'alerts API',
  events: {
    loadAlertsSuccess: props<{ alerts: Page<Alert> }>(),
    loadAlertsFailure: props<{ errorAPIAlerts: string }>(),
  }
})

export const { loadAlertsSuccess, loadAlertsFailure } = alertsAPIActions;

export const AlertsReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingAlerts: true })),
  on(setSelectedPageable, (state, { pageable }) =>
    ({ ...state, selectedPageable: pageable })),

  on(loadAlertsSuccess,
    (state, { alerts }) => ({ ...state, alerts, isLoadingAlerts: false })),
  on(loadAlertsFailure,
    (state, { errorAPIAlerts }) => ({ ...state, errorAPIAlerts, isLoadingAlerts: false })),
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
  selectSelectedPageable,
} = alertsFeature
