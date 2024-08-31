import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  public expandedBranchId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  baseUrl = 'https://the-spot-bookings-be.onrender.com';
  //baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getSpotBranches(): Observable<any> {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2hpbC5jaGlubmkuMjRAZ21haWwuY29tIiwiaWF0IjoxNzI1MDg1NjQyLCJleHAiOjE3MjUwODkyNDJ9.3lwmb6JFj6PH-8D9KXQFef__tq_Z9xb8x5-zpDZ0zGU';
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    //return this.http.get<any>('http://localhost:8080/the-spot/branch/get-branches', { headers });
    return this.http.get<any>(this.baseUrl + '/the-spot/branch/get-branches');
  }

  getSpotBranchById(id: string): Observable<any> {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2hpbC5jaGlubmkuMjRAZ21haWwuY29tIiwiaWF0IjoxNzI1MDg1NjQyLCJleHAiOjE3MjUwODkyNDJ9.3lwmb6JFj6PH-8D9KXQFef__tq_Z9xb8x5-zpDZ0zGU';
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    // /return this.http.get<any>('http://localhost:8080/the-spot/branch/get-branch/'+id, { headers });
    return this.http.get<any>(this.baseUrl + '/the-spot/branch/get-branch/'+id);
  }

}
