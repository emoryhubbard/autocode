import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()), { provide: 'test',
    useValue: 'testing123' }]
};

export function newAppConfig(url: string): ApplicationConfig {
  return {
    providers: [provideRouter(routes), provideClientHydration(),
      provideHttpClient(withFetch()),
      {provide: 'serverUrl', useValue: url }]
  };
}
