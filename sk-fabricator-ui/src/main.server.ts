import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { config } from './app/app.config.server';

// The function must now accept a context argument for SSR
const bootstrap = (context?: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;