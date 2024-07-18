import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../core/auth/services/auth.service";
import { map, Observable } from "rxjs";
import { ManagerRoomType } from "../models/manager-room-type";
import { ManagerAddRoomType } from "../models/manager-add-room-type";

@Injectable({
  providedIn: 'root'
})
export class ManagerAddRoomTypeService {
  private apiControllerUrl = `${environment.apiUrl}/api/roomtypes`;
  token = this.authService.tokenWithBearer;

  constructor(private _http: HttpClient, private authService: AuthService) {

  }

  add(addRoomType: ManagerAddRoomType): Observable<ManagerRoomType> {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.post<{ success: boolean; message: string; data: ManagerRoomType}>(this.apiControllerUrl,addRoomType, { headers })
    .pipe(
      map((response) => {
        console.log(response.data);
        console.log(JSON.stringify(response.data));
        return response.data;
      }));
  }
}
