import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, } from "rxjs";
import { load, loadAlertsFailure, loadAlertsSuccess, selectSelectedPageable } from "./alert.state";
import { AlertService } from "../../services/alert.service";
import { Store } from "@ngrx/store";

export const loadAlerts = createEffect(
  (
    actions$ = inject(Actions),
    alertService = inject(AlertService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(load),
      switchMap(() => store.select(selectSelectedPageable)),
      exhaustMap((p) =>
        alertService.getAlerts(p).pipe(
          map(alerts => loadAlertsSuccess({ alerts })),
          catchError(error => of(loadAlertsFailure({ errorAPIAlerts: error })))
        )
      )
    );
  },
  { functional: true }
);
