import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = `${environment.apiUrl}/api/contact`; // Örneğin contact API'si URL'si

  constructor(private http: HttpClient) {}

  postContactForm(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, formData);
  }
}