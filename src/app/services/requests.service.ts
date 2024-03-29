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
  getRequestById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/inquiries/${id}`);
}
updateRequestStatusById(id: string, newStatus: any, otherData: any): Observable<any> {
  const url = `${this.baseUrl}/inquiries/${id}`;
  const updatedRequest = {  ...otherData, Status: newStatus }; 
  return this.http.put<any>(url, updatedRequest);
}

}
