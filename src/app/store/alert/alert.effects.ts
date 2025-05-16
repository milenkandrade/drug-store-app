import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, } from "rxjs";
import { load, loadAlertsFailure, loadAlertsSuccess } from "./alert.state";
import { AlertService } from "../../services/alert.service";

export const loadAlerts = createEffect(
  (
    actions$ = inject(Actions),
    alertService = inject(AlertService),
  ) => {
    return actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        alertService.getAlerts().pipe(
          map(alerts => loadAlertsSuccess({ alerts })),
          catchError(error => of(loadAlertsFailure({ errorAPIAlerts: error })))
        )
      )
    );
  },
  { functional: true }
);
