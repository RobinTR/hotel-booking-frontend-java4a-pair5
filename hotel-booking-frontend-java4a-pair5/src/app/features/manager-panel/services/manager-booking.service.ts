import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "../../../core/auth/services/auth.service";
import { map, Observable } from "rxjs";
import { GetBookingByManagerIdResponse } from "../models/get-booking-by-manager-id";
import { ReservationStatus } from "../../reservation-status/models/reservation-status";

@Injectable({
  providedIn: 'root'
})
export class ManagerBookingService {
  private apiControllerUrl = `${environment.apiUrl}/api/bookings`;
  token = this.authService.tokenWithBearer;

  constructor(private _http: HttpClient, private authService: AuthService) {

  }

  getBookingsOfManager(managerId: number): Observable<GetBookingByManagerIdResponse[]> {
    let queryParams: any = {};
    queryParams.managerId = managerId;

    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.get<{ success: boolean; message: string; data: GetBookingByManagerIdResponse[] }>(`${this.apiControllerUrl}/getBookingsByManagerId`, { params: queryParams })
      .pipe(
        map((response) => {
          return response.data;
        }));
  }

  patchReservationStatus(bookingId: number, reservationStatus: ReservationStatus): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams().set('reservationStatus', reservationStatus.toString());

    return this._http.patch<{ success: boolean; message: string; }>(`${this.apiControllerUrl}/${bookingId}/reservationstatus`, {}, { headers, params }).pipe(
      map((response) => {
        return response.message;
      }));
  }
}
