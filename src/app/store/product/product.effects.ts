import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, } from "rxjs";
import { load, loadProductsFailure, loadProductsSuccess } from "./product.state";
import { ProductService } from "../../services/product.service";

export const loadProducts = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
  ) => {
    return actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        productService.getProducts().pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ errorAPIProducts: error })))
        )
      )
    );
  },
  { functional: true }
);
