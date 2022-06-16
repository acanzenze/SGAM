import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }
  
  public apiUrl = 'http://127.0.0.1:3333/api/v1';
}
