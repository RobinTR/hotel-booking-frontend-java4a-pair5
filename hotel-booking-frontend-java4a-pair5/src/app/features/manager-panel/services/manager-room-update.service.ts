import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../core/auth/services/auth.service";
import { Observable } from "rxjs";
import { ManagerRoom } from "../models/manager-room";

@Injectable({
  providedIn: 'root'
})
export class ManagerRoomUpdateService {
  private apiControllerUrl = `${environment.apiUrl}/api/rooms`;
  token = this.authService.tokenWithBearer;

  constructor(private _http: HttpClient, private authService: AuthService) {

  }

  update(room: ManagerRoom): Observable<ManagerRoom> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.put<ManagerRoom>(this.apiControllerUrl, room, { headers });
  }
}
