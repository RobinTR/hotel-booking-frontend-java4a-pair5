import { Injectable, Input } from "@angular/core";
import { Hotel } from "../../hotels/models/hotel";
import { Room } from "../../room/models/room";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Booking } from "../models/booking";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private apiControllerUrl = `${environment.apiUrl}/api/bookings`;
    @Input() bookingHotel?: Hotel;
    @Input() bookingRoom?: Room;
  
    constructor(
      private _http: HttpClient
    ) {
  
    }

    makeReservation(booking: Booking) : Observable<Booking> {
        return this._http.post<Booking>(this.apiControllerUrl, booking, { responseType: 'json' });
    }
}