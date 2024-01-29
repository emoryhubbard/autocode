import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
window.console.log("Testing to see if main logs");
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
