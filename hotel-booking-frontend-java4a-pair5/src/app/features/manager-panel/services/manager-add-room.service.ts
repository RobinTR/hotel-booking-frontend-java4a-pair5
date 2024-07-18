import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../core/auth/services/auth.service";
import { map, Observable } from "rxjs";
import { ManagerRoom } from "../models/manager-room";
import { ManagerAddRoom } from "../models/manager-add-room";

@Injectable({
  providedIn: 'root'
})
export class ManagerAddRoomService {
  private apiControllerUrl = `${environment.apiUrl}/api/rooms`;
  token = this.authService.tokenWithBearer;

  constructor(private _http: HttpClient, private authService: AuthService) {

  }

  add(managerRoom: ManagerAddRoom): Observable<ManagerRoom> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.post<ManagerRoom>(this.apiControllerUrl, managerRoom, { headers });
  }
}
