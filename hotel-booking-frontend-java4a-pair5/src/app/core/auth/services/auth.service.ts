import { Injectable } from '@angular/core';
import { AccessTokenPayload } from '../models/access-token-payload';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly _logged = new Subject<void>();

  constructor() { }

  public get logged(): Observable<void> {
    return this._logged.asObservable();
  }

  protected readonly _loggedOut = new Subject<void>();
  public get loggedOut(): Observable<void> {
    return this._loggedOut.asObservable();
  }

  protected readonly _isLogged = new BehaviorSubject<boolean>(this.isAuthenticated);
  public get isLogged(): Observable<boolean> {
    return this._isLogged.asObservable();
  }

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
    if (!this.token) return false;

    const nowUnixTimeInMilliseconds = Date.now();
    const nowUnitTimeInSeconds = Math.floor(nowUnixTimeInMilliseconds / 1000);

    if (nowUnitTimeInSeconds > this.tokenPayload!.exp) {
      this.logout();
      return false;
    }

    return true;
  }

  public isAuthorized(requiredRoles: string[]): boolean {
    if (!this.isAuthenticated) return false;

    const tokenRoles = this.tokenPayload!.roles.map((role) => role.role);

    if (
      !requiredRoles.some((requiredRole) =>
        tokenRoles.includes(requiredRole)
      )
    ) {
      return false;
    }

    return true;
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    this._loggedOut.next();
    this._isLogged.next(false);
  }

  protected get token(): string | null {
    return localStorage.getItem('accessToken');
  }

  protected set token(token: string) {
    localStorage.setItem('accessToken', token);
  }
}