import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { UserResponse } from "../models/user-response";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";
import { AuthService } from "../../../core/auth/services/auth.service";
import { UserUpdateRequest } from "../models/user-update-request";

@Injectable({
    providedIn: 'root'
})
export class UserUpdateService {
    private apiControllerUrl = `${environment.apiUrl}/api/users`;
    token = this.authService.tokenWithBearer;

    constructor(private _http: HttpClient, private authService: AuthService) { }

    updateUser(user: UserUpdateRequest): Observable<UserResponse> {
        const headers = new HttpHeaders({
            'Authorization': `${this.token}`,
            'Content-Type': 'application/json'
        });

        return this._http.put<UserResponse>(this.apiControllerUrl, user, { headers });
    }
}