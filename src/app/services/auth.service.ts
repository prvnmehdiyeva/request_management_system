import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UsersInfo } from '../models/users-info';
import { InquiriesInfo } from '../models/inquiries-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  handleError: any;
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user`);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }
  updateUser(userId: string, newPassword: string, userName:string): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.put<any>(url, { name:userName,password: newPassword });
  }

  getInquiries(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/inquiries`);
  }
  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/status`);
  }

  //post
  addRequest(request: InquiriesInfo): Observable<InquiriesInfo> {
    const url = `${this.baseUrl}/inquiries`;
    return this.http.post<InquiriesInfo>(url, request)
  }

  //comment

  getComments(){
    return this.http.get<any>(`${this.baseUrl}/comments`);
  }
}
