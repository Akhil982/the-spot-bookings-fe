import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  //baseUrl = 'https://the-spot-bookings-be.onrender.com';
  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  addBookings(booking: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/the-spot/bookings/add-booking', booking);
  }

  getBookingsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/the-spot/bookings/get-bookings-by-user-id/' + userId);
  }

}
