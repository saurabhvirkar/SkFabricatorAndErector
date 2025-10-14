import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { appConfig } from './app/app.config';

// Bootstrapping the root standalone component with the global configuration
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
