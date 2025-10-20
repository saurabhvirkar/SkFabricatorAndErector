import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];

  return authService.currentUserRole$.pipe(
    map(role => {
      if (role && expectedRoles.includes(role)) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  );
};