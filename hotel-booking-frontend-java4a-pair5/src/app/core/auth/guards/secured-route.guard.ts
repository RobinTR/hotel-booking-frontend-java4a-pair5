import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AUTH_ERROR_REDIRECT_URL_TOKEN } from '../providers/auth.provider';

export const routeDataKey = 'securedRoute';
export interface SecuredRoute {
  reqiredRole: string[];
}

export const securedRouteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authErrorRedirectUrl = inject(AUTH_ERROR_REDIRECT_URL_TOKEN);

  if (!authService.isAuthenticated) {
    router.navigateByUrl(authErrorRedirectUrl);
    return false;
  }

  if (route.data[routeDataKey]) {
    const { requiredRole } = route.data[routeDataKey];
    if (!authService.isAuthorized(requiredRole)) {
      router.navigateByUrl(authErrorRedirectUrl);
      return false;
    }
  }

  return true;
};