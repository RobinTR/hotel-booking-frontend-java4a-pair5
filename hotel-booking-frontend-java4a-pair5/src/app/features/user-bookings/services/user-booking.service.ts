import { Injectable, Input } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../core/auth/services/auth.service";
import { map, Observable } from "rxjs";
import { GetBookingByUserIdResponse } from "../models/get-booking-by-user-id";

@Injectable({
    providedIn: 'root'
})
export class UserBookingService {
    booking?: GetBookingByUserIdResponse;
    private apiControllerUrl = `${environment.apiUrl}/api/bookings`;

    constructor(private _http: HttpClient, private authService: AuthService) {

    }

    public getCurrentUserId(): number | null {
        return this.authService.userId;
    }

    public getUserBookingsById(userId: number): Observable<GetBookingByUserIdResponse[]> {
        let queryParams: any = {};
        queryParams.userId = userId;
    
        return this._http.get<{ success: boolean; message: string; data: GetBookingByUserIdResponse[] }>(this.apiControllerUrl + "/getBookingsByUserId", { params: queryParams })
            .pipe(
                map((response) => {
                    console.log(JSON.stringify(response.data) + "service");
                    console.log(response.data + "service");
                    return response.data;
                })
            );
    }
}