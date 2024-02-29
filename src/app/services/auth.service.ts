import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UsersInfo } from '../models/users-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  handleError: any;
 

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  getInquiries(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/inquiries`);
  }
  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/status`);
  }
}
