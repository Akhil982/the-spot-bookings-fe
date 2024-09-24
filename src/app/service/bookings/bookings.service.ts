import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environmemt';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addBookings(booking: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/the-spot/bookings/add-booking', booking);
  }

  getBookingsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/the-spot/bookings/get-bookings-by-user-id/' + userId);
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/the-spot/bookings/delete-booking/' + id);
  }

}
