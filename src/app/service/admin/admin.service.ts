import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environmemt';
import { HttpClient } from '@angular/common/http';
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
}
