// This file usually imports and re-exports the main routes
import { Routes } from '@angular/router';
import { routes } from './app.routes';

export const appRoutesServer: Routes = [...routes];
