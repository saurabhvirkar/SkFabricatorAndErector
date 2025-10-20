import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Bootstrapping the root standalone component with the global configuration
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
