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
    return this.http.get<any>(`${this.baseUrl}/requests`);
  }
  
  //post
  addRequest(request: InquiriesInfo): Observable<InquiriesInfo> {
    const url = `${this.baseUrl}/requests`;
    return this.http.post<InquiriesInfo>(url, request)
  }
 
  //byId
  getRequestById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/requests/${id}`);
}
updateRequestStatusById(id: string, newStatus: any, otherData: any): Observable<any> {
  const url = `${this.baseUrl}/requests/${id}`;
  const updatedRequest = {  ...otherData, Status: newStatus }; 
  return this.http.put<any>(url, updatedRequest);
}
updateRequestStatus(id: string, newStatus: any, otherData: any): Observable<any> {
  const url = `${this.baseUrl}/requests/${id}`;
  const updatedRequest = {  ...otherData, requestInformation: newStatus }; 
  return this.http.put<any>(url, updatedRequest);
}

}
