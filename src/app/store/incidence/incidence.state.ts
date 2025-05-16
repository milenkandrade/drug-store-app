import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

export const incidencesFeatureKey = 'incidences';

interface State {
  incidences: string[],
  isLoadingIncidences: boolean,
  errorAPIIncidences: string ,
}

const initialState: State = {
  incidences: [],
  isLoadingIncidences: false,
  errorAPIIncidences: '',
}

export const incidencesPageActions = createActionGroup({
  source: 'incidences page',
  events: {
    load: emptyProps()
  }
})

export const {load} = incidencesPageActions;

export const incidencesAPIActions = createActionGroup({
  source: 'incidences API',
  events: {
    loadIncidencesSuccess: props<{ incidences: string[] }>(),
    loadIncidencesFailure: props<{ errorAPIIncidences: string }>(),
  }
})

export const { loadIncidencesSuccess, loadIncidencesFailure } = incidencesAPIActions;

export const IncidencesReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingIncidences: true })),
  on(loadIncidencesSuccess,
    (state, { incidences }) => ({ ...state, incidences, isLoadingBrands: false })),
  on(loadIncidencesFailure,
    (state, { errorAPIIncidences }) => ({ ...state, errorAPIIncidences, isLoadingBrands: false })),
)

export const incidencesFeature = createFeature({
  name: incidencesFeatureKey,
  reducer: IncidencesReducer,
})

export const {
  name,
  reducer,
  selectIncidences,
  selectIncidencesState,
  selectErrorAPIIncidences,
  selectIsLoadingIncidences,
} = incidencesFeature
