import { bootstrapApplication, provideClientHydration, provideProtractorTestingSupport } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import routeConfig from './app/routes';
window.console.log("Testing to see if main logs");
/*bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));*/
/*bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));*/
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideClientHydration(),
    provideHttpClient(withFetch()), { provide: 'test',
    useValue: 'testing123' }]
}).catch((err) => console.error(err));