import { Injectable, Input } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Register } from "../models/register";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private apiControllerUrl = `${environment.apiUrl}/api/v1/auth/register`;
    @Input() userToRegister!: Register;

    constructor(
        private _http: HttpClient
    ) {

    }

    register(userToRegister: Register): Observable<Register> {
        return this._http.post<Register>(this.apiControllerUrl, userToRegister, { responseType: 'json' });
    }
}