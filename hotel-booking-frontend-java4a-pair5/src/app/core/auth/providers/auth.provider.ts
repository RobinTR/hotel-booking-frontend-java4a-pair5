import { InjectionToken, Provider } from '@angular/core';

const AUTH_ERROR_REDIRECT_URL = 'AUTH_ERROR_REDIRECT_URL';
export const AUTH_ERROR_REDIRECT_URL_TOKEN = new InjectionToken<string>(
  AUTH_ERROR_REDIRECT_URL
);

export function provideAuthErrorRedirectUrl(url: string): Provider {
  return {
    provide: AUTH_ERROR_REDIRECT_URL_TOKEN,
    useValue: url,
  };
}