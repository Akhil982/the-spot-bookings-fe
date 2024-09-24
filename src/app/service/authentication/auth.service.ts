import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environmemt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  signupSpotUser(signupReq: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/the-spot/auth/signup', signupReq);
  }

  signInSpotUser(signinReq: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/the-spot/auth/signin', signinReq);
  }
}
