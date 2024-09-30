import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environmemt';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAdminBranches(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/the-spot/admin/get-branches');
  }

  getRevenueData(branchId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/the-spot/admin/get-branch-dashboard/` + branchId);
}

}
