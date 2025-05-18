import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, } from "rxjs";
import { load, loadCategoriesFailure, loadCategoriesSuccess } from "./category.state";
import { CategoryService } from "../../services/category.service";

export const loadCategories = createEffect(
  (
    actions$ = inject(Actions),
    categoryService = inject(CategoryService),
  ) => {
    return actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        categoryService.getCategories({ number: 1 }).pipe(
          map(categories => loadCategoriesSuccess({ categories })),
          catchError(error => of(loadCategoriesFailure({ errorAPICategories: error })))
        )
      )
    );
  },
  { functional: true }
);
