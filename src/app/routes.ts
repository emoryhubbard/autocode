import {Routes} from '@angular/router';
import {GetApiKeyComponent} from './get-api-key/get-api-key.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

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
  ];

export default routeConfig;