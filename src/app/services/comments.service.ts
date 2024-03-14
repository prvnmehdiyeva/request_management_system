import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComment } from '../models/appcomment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getComments(){
    return this.http.get<any>(`${this.baseUrl}/comments`);
  }
  
// post
  addComment(comment: AppComment): Observable<AppComment> {
    return this.http.post<AppComment>(`${this.baseUrl}/comments`, comment);
  }

}
