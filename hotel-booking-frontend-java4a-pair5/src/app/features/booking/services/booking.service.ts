import { Injectable, Input } from "@angular/core";
import { Hotel } from "../../hotels/models/hotel";
import { Room } from "../../room/models/room";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Booking } from "../models/booking";
import { Observable } from "rxjs";
import { AuthService } from "../../../core/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private apiControllerUrl = `${environment.apiUrl}/api/bookings`;
    @Input() bookingHotel?: Hotel;
    @Input() bookingRoom?: Room;
    token = this.authService.tokenWithBearer;
  
    constructor(private _http: HttpClient, private authService: AuthService) {
  
    }

    makeReservation(booking: Booking) : Observable<Booking> {
        const headers = new HttpHeaders({
            'Authorization': `${this.token}`,
            'Content-Type': 'application/json'
          });

        return this._http.post<Booking>(this.apiControllerUrl, booking, { headers });
    }
}