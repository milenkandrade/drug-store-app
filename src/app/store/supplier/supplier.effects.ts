import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, } from "rxjs";
import { load, loadSuppliersFailure, loadSuppliersSuccess } from "./supplier.state";
import { SupplierService } from "../../services/supplier.service";

export const loadSuppliers = createEffect(
  (
    actions$ = inject(Actions),
    supplierService = inject(SupplierService),
  ) => {
    return actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        supplierService.getSuppliers().pipe(
          map(suppliers => loadSuppliersSuccess({ suppliers })),
          catchError(error => of(loadSuppliersFailure({ errorAPISuppliers: error })))
        )
      )
    );
  },
  { functional: true }
);
