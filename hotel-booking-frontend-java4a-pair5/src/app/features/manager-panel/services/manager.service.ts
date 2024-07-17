import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { AddHotel } from "../models/add-hotel";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../core/auth/services/auth.service";
import { map, Observable } from "rxjs";
import { Hotel } from "../../hotels/models/hotel";
import { Room } from "../../room/models/room";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  currentHotel?: Hotel[];
  selectedRoom?: Room;
  private apiControllerUrl = `${environment.apiUrl}/api/hotels`;
  token = this.authService.tokenWithBearer;

  constructor(private _http: HttpClient, private authService: AuthService) {

  }

  add(addHotel: AddHotel): Observable<AddHotel> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.post<AddHotel>(this.apiControllerUrl, addHotel, { headers });
  }

  getHotelsOfManager(managerId: number | undefined): Observable<Hotel[]> {
    let queryParams: any = {};
    queryParams.managerId = managerId;

    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(`${this.apiControllerUrl}/searchHotelsByManager`, { params: queryParams })
      .pipe(
        map((response) => {
          let hotel: Hotel[] = response.data;

          return hotel;
        }));
  }
}
