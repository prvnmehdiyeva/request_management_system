import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InquiriesInfo } from '../models/inquiries-info';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRequests(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/inquiries`);
  }
  
  //post
  addRequest(request: InquiriesInfo): Observable<InquiriesInfo> {
    const url = `${this.baseUrl}/inquiries`;
    return this.http.post<InquiriesInfo>(url, request)
  }

  //byId
  getRequestById(userId: string, id: string): Observable<InquiriesInfo> {
    return this.http.get<InquiriesInfo>(`${this.baseUrl}/users/${userId}/request-detail/${id}`);
}
}
