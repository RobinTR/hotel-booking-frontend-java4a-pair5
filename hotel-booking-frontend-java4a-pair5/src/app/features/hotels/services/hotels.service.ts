import { env } from "process";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HotelListItem } from "../models/hotel-list-item";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { PaginatedList } from "../../../core/models/paginated-list";
import { log } from "console";

@Injectable({
    providedIn: 'root'
})
export class HotelsService {
    private apiControllerUrl = `${environment.apiUrl}/api/hotels`;
    

    constructor(
        private _http: HttpClient
    ) {

    }

    getList(
        pageIndex: number,
        pageSize: number,
        filterByHotelId: number | null): Observable<PaginatedList<HotelListItem>> {
            let queryParams: any = {};
            if (filterByHotelId) {
              queryParams.hotelId = filterByHotelId.toString();
            }
        return this._http.get<{ success: boolean; message: string; data: HotelListItem[] }>(this.apiControllerUrl,  { params: queryParams })
            .pipe(
                map((response) => {
                    const paginatedList: PaginatedList<HotelListItem> = {
                        items: response.data.slice(
                            pageIndex * pageSize,
                            pageIndex * pageSize + pageSize
                        ),
                        pageIndex,
                        pageSize,
                        totalCount: response.data.length,
                    };
                    return paginatedList;
                }));
    }

  searchByLocation(location: string): Observable<PaginatedList<HotelListItem>> {
    const queryParams = { location }; // Assuming your backend expects 'location' as a query parameter

    return this._http.get<{ success: boolean; message: string; data: HotelListItem[] }>(`${this.apiControllerUrl}/searchByLocation`, { params: queryParams })
      .pipe(
        map((response) => {
          const paginatedList: PaginatedList<HotelListItem> = {
            items: response.data,
            pageIndex: 0, // Adjust as needed
            pageSize: response.data.length, // Adjust as needed
            totalCount: response.data.length,
          };
          console.log(response);
          
          return paginatedList;
        })
      );
  }
}