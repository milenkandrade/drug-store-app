import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";

export const usersFeatureKey = 'users';

interface State {
  users: string[],
  isLoadingUsers: boolean,
  errorAPIUsers: string ,
}

const initialState: State = {
  users: [],
  isLoadingUsers: false,
  errorAPIUsers: '',
}

export const usersPageActions = createActionGroup({
  source: 'users page',
  events: {
    load: emptyProps()
  }
})

export const {load} = usersPageActions;

export const usersAPIActions = createActionGroup({
  source: 'users API',
  events: {
    loadUsersSuccess: props<{ users: string[] }>(),
    loadUsersFailure: props<{ errorAPIUsers: string }>(),
  }
})

export const { loadUsersSuccess, loadUsersFailure } = usersAPIActions;

export const UsersReducer = createReducer(
  initialState,
  on(load, (state, {  }) => ({ ...state, isLoadingUsers: true })),
  on(loadUsersSuccess,
    (state, { users }) => ({ ...state, users, isLoadingBrands: false })),
  on(loadUsersFailure,
    (state, { errorAPIUsers }) => ({ ...state, errorAPIUsers, isLoadingBrands: false })),
)

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer: UsersReducer,
})

export const {
  name,
  reducer,
  selectUsers,
  selectUsersState,
  selectErrorAPIUsers,
  selectIsLoadingUsers,
} = usersFeature
