import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../core/auth/services/auth.service";
import { Observable } from "rxjs";
import { ManagerRoomType } from "../models/manager-room-type";

@Injectable({
  providedIn: 'root'
})
export class ManagerRoomTypeUpdateService {
  private apiControllerUrl = `${environment.apiUrl}/api/roomtypes`;
  token = this.authService.tokenWithBearer;

  constructor(private _http: HttpClient, private authService: AuthService) {

  }

  update(roomType: ManagerRoomType): Observable<ManagerRoomType> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.put<ManagerRoomType>(this.apiControllerUrl, roomType, { headers });
  }
}
