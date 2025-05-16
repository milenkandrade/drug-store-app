import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, } from "rxjs";
import { load, loadInvoicesFailure, loadInvoicesSuccess } from "./invoice.state";
import { InvoiceService } from "../../services/invoice.service";

export const loadInvoices = createEffect(
  (
    actions$ = inject(Actions),
    invoiceService = inject(InvoiceService),
  ) => {
    return actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        invoiceService.getInvoices().pipe(
          map(invoices => loadInvoicesSuccess({ invoices })),
          catchError(error => of(loadInvoicesFailure({ errorAPIInvoices: error })))
        )
      )
    );
  },
  { functional: true }
);
