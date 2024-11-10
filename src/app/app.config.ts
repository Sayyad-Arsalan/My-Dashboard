import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ prefix: 'custom', separator: '.', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ),
    provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers

  ],
};
