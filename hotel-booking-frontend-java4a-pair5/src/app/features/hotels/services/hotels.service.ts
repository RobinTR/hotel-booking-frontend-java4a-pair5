import { env } from "process";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HotelListItem } from "../models/hotel-list-item";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { PaginatedList } from "../../../core/models/paginated-list";

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
        pageSize: number): Observable<PaginatedList<HotelListItem>> {
        return this._http.get<{ success: boolean; message: string; data: HotelListItem[] }>(this.apiControllerUrl)
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
}