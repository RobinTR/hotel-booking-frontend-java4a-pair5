import { Injectable } from '@angular/core';
import { AccessTokenPayload } from '../models/access-token-payload';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    public get tokenPayload(): AccessTokenPayload | null {
      if (!this.token) return null;
  
      const encodedPayload = this.token.split('.')[1];
      try {
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload) as AccessTokenPayload;
        return payload;
      } catch (error) {
        console.error('Invalid token payload', error);
        return null;
      }
    }
  
    public get isAuthenticated(): boolean {
      return !!this.token;
    }
  
    public isAuthorized(requiredRoleIds: string[]): boolean {
      const payload = this.tokenPayload;
      if (!payload) return false;
  
      const tokenRoleIds = payload.roles.map(role => role.role);
      return requiredRoleIds.some(requiredRole => tokenRoleIds.includes(requiredRole));
    }
  
    public logout(): void {
      localStorage.removeItem('accessToken');
    }
  
    protected get token(): string | null {
      return localStorage.getItem('accessToken');
    }
  
    protected set token(token: string | null) {
      if (token) {
        localStorage.setItem('accessToken', token);
      } else {
        localStorage.removeItem('accessToken');
      }
    }
}