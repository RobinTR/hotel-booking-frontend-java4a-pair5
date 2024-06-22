import { env } from "process";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { HotelListItem } from "../models/hotel-list-item";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HotelsService {
    private apiControllerUrl = `${environment.apiUrl}/api/hotels`;

    constructor(
        private _http: HttpClient
      ) {
        
      }

      getList(): Observable<HotelListItem[]> {
        return this._http.get<{ success: boolean; message: string; data: HotelListItem[] }>(this.apiControllerUrl)
            .pipe(
                map(response => response.data)
            );
      }
}