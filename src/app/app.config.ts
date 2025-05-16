import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { effects, reducers, states, storeConfig } from './store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers, storeConfig),
    states,
    effects,
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
]
};
