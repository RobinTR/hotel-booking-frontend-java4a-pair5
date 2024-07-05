import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "../models/user-profile";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiControllerUrl = `${environment.apiUrl}/api/v1/auth`;

  constructor(private http: HttpClient) { }

 
  getUserProfile(): Observable<User> {
    const token = localStorage.getItem('accessToken'); 

    if (!token) {
        return throwError('Token not found');
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiControllerUrl}/profile`, { headers }).pipe(
        catchError(error => {
            console.error('Error fetching user profile:', error);
            return throwError('Failed to fetch user profile');
        })
    );
}
}