import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComment } from '../models/appcomment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = 'http://localhost:3000';
  private myData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  getComments(){
    return this.http.get<any>(`${this.baseUrl}/comments`);
  }
  
// post
  addComment(comment: AppComment): Observable<AppComment> {
    const url = `${this.baseUrl}/comments`
    return this.http.post<AppComment>(url, comment);
  }
  

}
