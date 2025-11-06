import { mergeApplicationConfig, ApplicationConfig, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from './environments/environment';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => {
        environment.apiUrl = 'https://skfabricatorapi.onrender.com'; // Use your production API URL
      },
      multi: true,
    },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
