import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }
  setItem(key:string, value:string){
    sessionStorage.setItem(key, JSON.stringify(value))
  }
}
