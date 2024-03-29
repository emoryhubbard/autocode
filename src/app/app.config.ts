import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

//import routeConfig from './app.routes'
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GetApiKeyComponent } from './get-api-key/get-api-key.component';
import { HomeComponent } from './home/home.component';
import { CreateJobComponent } from './create-job/create-job.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Autocode Generator',
  },
  {
    path: 'get-api-key',
    component: GetApiKeyComponent,
    title: 'Get API Key',
  },
  {
    path: 'create-job',
    component: CreateJobComponent,
    title: 'Create New Job',
  }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), provideClientHydration(),
    provideHttpClient(withFetch()), { provide: 'test',
    useValue: 'testing123' }]
};

export function newAppConfig(url: string): ApplicationConfig {
  return {
    providers: [provideRouter(routeConfig), provideClientHydration(),
      provideHttpClient(withFetch()),
      {provide: 'serverUrl', useValue: url }]
  };
}
