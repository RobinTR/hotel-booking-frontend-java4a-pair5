import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { PaginatedList } from "../../../core/models/paginated-list";
import { Hotel } from "../models/hotel";

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  
  private apiControllerUrl = `${environment.apiUrl}/api/hotels`;
  private selectedHotel: Hotel | null = null;

  constructor(
    private _http: HttpClient
  ) {

  }

  getList(
    pageIndex: number,
    pageSize: number,
    filterByHotelId: number | null): Observable<PaginatedList<Hotel>> {
    let queryParams: any = {};
    if (filterByHotelId) {
      queryParams.hotelId = filterByHotelId.toString();
    }
    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(this.apiControllerUrl, { params: queryParams })
      .pipe(
        map((response) => {
          const paginatedList: PaginatedList<Hotel> = {
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

  searchByLocation(location: string): Observable<PaginatedList<Hotel>> {
    const queryParams = { location };

    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(`${this.apiControllerUrl}/searchByLocation`, { params: queryParams })
      .pipe(
        map((response) => {
          const paginatedList: PaginatedList<Hotel> = {
            items: response.data,
            pageIndex: 0,
            pageSize: response.data.length,
            totalCount: response.data.length,
          };
          console.log(response);

          return paginatedList;
        })
      );
  }
  searchByDate(startDate: string,endDate:string): Observable<PaginatedList<Hotel>> {
    const queryParams = { startDate,endDate };
 
  
    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(`${this.apiControllerUrl}/searchByDate`, { params : queryParams })
      .pipe(
        map((response) => {
          const paginatedList: PaginatedList<Hotel> = {
            items: response.data,
            pageIndex: 0,
            pageSize: response.data.length,
            totalCount: response.data.length,
          };
          console.log(response);

          return paginatedList;
        })
      );
  }

  searchByPerson(person: number) : Observable<PaginatedList<Hotel>> {
    const queryParams = { person };
  
    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(`${this.apiControllerUrl}/searchByRoomCapacityHotels`, { params: queryParams })
      .pipe(
        map((response) => {
          const paginatedList: PaginatedList<Hotel> = {
            items: response.data,
            pageIndex: 0,
            pageSize: response.data.length,
            totalCount: response.data.length,
          };
          console.log(response);

          return paginatedList;
        })
      );
  }

  setSelectedHotel(hotel: Hotel) {
    this.selectedHotel = hotel;
  }

  getSelectedHotel(): Hotel | null {
    return this.selectedHotel;
  }

}