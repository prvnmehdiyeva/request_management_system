import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { InquiriesInfo } from '../../models/inquiries-info';
import { Status } from '../../models/status';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  public cards!: InquiriesInfo[]
  filteredInquiries: InquiriesInfo[] = [];
  constructor(private http:HttpClient) { }
  
  getInfo():Observable<InquiriesInfo[]>{
    return this.http.get<any>('./assets/info.json')
    .pipe(
      tap(cards => {
        this.cards = cards;
        this.filteredInquiries = cards;
      })
    );
  }
  getStatus():Observable<Status[]>{
    return this.http.get<any>('./assets/status.json')
  }
}
