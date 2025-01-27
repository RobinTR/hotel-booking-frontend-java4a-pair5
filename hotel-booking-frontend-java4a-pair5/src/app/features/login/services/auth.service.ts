import { Inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
import { LoginCredentials } from "../models/login-credentials";
import { LoginResponse } from "../models/login-response";
import { AuthService as CoreAuthService } from '../../../core/auth/services/auth.service';
import { DOCUMENT } from "@angular/common";

@Injectable({
    providedIn: 'root',
})
export class AuthService extends CoreAuthService {
    private apiControllerUrl = `${environment.apiUrl}/api/v1/auth`;

    constructor(private http: HttpClient, @Inject(DOCUMENT) document: Document) {
        super(document);
    }

    login(loginCredentials: LoginCredentials): Observable<string> {
        return this.http
            .post<LoginResponse>(`${this.apiControllerUrl}/login`, loginCredentials)
            .pipe(
                tap((response: LoginResponse) => {
                    if (response.success) {
                        this.token = response.data;
                        this._logged.next();
                        this._isLogged.next(true);
                    } else {

                    }
                }),
                map((response: LoginResponse) => response.data)
            );
    }
}