import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetApiKeyComponent } from './get-api-key/get-api-key.component';

export const routes: Routes = [
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
  ];
