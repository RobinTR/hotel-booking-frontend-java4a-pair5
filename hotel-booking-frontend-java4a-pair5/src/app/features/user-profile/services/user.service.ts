import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { UserResponse } from "../models/user-response";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";
import { AuthService } from "../../../core/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiControllerUrl = `${environment.apiUrl}/api/v1/auth`;
    token = this.authService.tokenWithBearer;

    constructor(private _http: HttpClient, private authService: AuthService) { }

    getUserProfile(): Observable<UserResponse> {
        let userId = this.authService.userId;

        if (!this.token) {
            return throwError('Token not found');
        }

        let queryParams: any = {};
        queryParams.userId = userId;

        const headers = new HttpHeaders({
            'Authorization': `${this.token}`
        });

        return this._http.get<{ success: boolean; message: string; data: UserResponse }>(`${this.apiControllerUrl}/profile`, { params: queryParams, headers: headers }).pipe(
            map((response) => {
                return response.data;
            }));
    }
}