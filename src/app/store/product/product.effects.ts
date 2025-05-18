import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, } from "rxjs";
import { load, loadProductsFailure, loadProductsSuccess, selectSelectedPageable } from "./product.state";
import { ProductService } from "../../services/product.service";
import { Store } from "@ngrx/store";

export const loadProducts = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(load),
      switchMap(() => store.select(selectSelectedPageable)),
      exhaustMap((v) =>
        productService.getProducts(v).pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ errorAPIProducts: error })))
        )
      )
    );
  },
  { functional: true }
);
