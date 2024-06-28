import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiControllerUrl = `${environment.apiUrl}/api/booking`;

  constructor(private _http: HttpClient) { }


}
