import { Injectable } from '@angular/core';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Response } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private apiUrl = environment.apiUrl
  private url = `${this.apiUrl}/api/provincias`

  constructor(private http: HttpClient) { }

  create(formData: any) {
    return this.http.post(this.url, formData)
  }
  update(id: any, formData: any) {
    return this.http.put(this.url + '/' + id, formData)
  }
  getAllProvincia(): Observable<Provincias[]> {
    return this.http.get<Provincias[]>(this.url);
  }

  find(id:any){
    return this.http.get(this.url+"/"+id)
  }
}
