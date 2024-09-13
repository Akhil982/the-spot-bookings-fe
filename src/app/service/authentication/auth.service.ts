import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //baseUrl = 'https://the-spot-bookings-be.onrender.com';
  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  signupSpotUser(signupReq: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/the-spot/auth/signup', signupReq);
  }

  signInSpotUser(signinReq: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/the-spot/auth/signin', signinReq);
  }
}
