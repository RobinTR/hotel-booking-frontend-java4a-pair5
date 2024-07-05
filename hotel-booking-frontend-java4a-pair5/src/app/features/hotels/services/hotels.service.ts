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
  selectedHotel: Hotel | null = null;

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

          return paginatedList;
        })
      );
  }
  searchByDate(startDate: string, endDate:string): Observable<PaginatedList<Hotel>> {
    let queryParams: any = {};
    queryParams.startDate = startDate;
    queryParams.endDate = endDate;
  
    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(`${this.apiControllerUrl}/searchAllHotelsWithFilters`, { params: queryParams })
      .pipe(
        map((response) => {
          const paginatedList: PaginatedList<Hotel> = {
            items: response.data,
            pageIndex: 0,
            pageSize: response.data.length,
            totalCount: response.data.length,
          };

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

          return paginatedList;
        })
      );
  }

  searchByRoomFilters(hotelId: number, checkInDate: String | null, checkOutDate: String | null, roomCapacity: String | null, location?: String | null) {
    let queryParams: any = {};
    queryParams.hotelId = hotelId;

    if (checkInDate) {
      queryParams.startDate = checkInDate;
    }

    if (checkOutDate) {
      queryParams.endDate = checkOutDate;
    }

    if (roomCapacity) {
      queryParams.roomCapacity = roomCapacity;
    }

    if (location) {
      queryParams.location = location;
    }

    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(`${this.apiControllerUrl}/searchByRoomFilters`, { params: queryParams })
      .pipe(
        map((response) => {
          let hotel: Hotel[] = response.data;

          return hotel.at(0);
        }));
  }

  searchByHotelId(hotelId: number | undefined) {
    let queryParams: any = {};
    queryParams.hotelId = hotelId;

    return this._http.get<{ success: boolean; message: string; data: Hotel }>(`${this.apiControllerUrl}/getById`, { params: queryParams })
      .pipe(
        map((response) => {
          let hotel: Hotel = response.data;

          return hotel;
        }));
  }

  searchHotelsByFilters(minPrice: number, maxPrice: number,featureIds: number[] ): Observable<PaginatedList<Hotel>> {
    let queryParams = new HttpParams()
    .set('minPrice', minPrice.toString())
    .set('maxPrice', maxPrice.toString());

    featureIds.forEach(id => {
      queryParams = queryParams.append('featureIds', id.toString());
    });

  
    return this._http.get<{ success: boolean; message: string; data: Hotel[] }>(`${this.apiControllerUrl}/searchAllHotelsWithFilters`, { params: queryParams })
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
}
