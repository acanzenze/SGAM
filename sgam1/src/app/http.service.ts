import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
      
  constructor(private http: HttpClient) { 
    
  }

  post(url:string, body:any){
   return this.http.post(url,body)
  }
}
