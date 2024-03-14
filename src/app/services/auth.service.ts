import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UsersInfo } from '../models/users-info';
import { InquiriesInfo } from '../models/inquiries-info';
import { AppComment } from '../models/appcomment';

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
  
  updateUserPassword(userId: string, newPassword: string, userName:string): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.put<any>(url, { name:userName,password: newPassword });
  }
  updateUserProfile(updatedProfileData: any): Observable<any> {
    const { id, ...rest } = updatedProfileData;
    
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.put<any>(url, rest);
  }

  getStatus(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/status`);
    }

}
