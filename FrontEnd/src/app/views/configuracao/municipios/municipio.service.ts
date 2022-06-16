import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private baseApiUrl=environment.apiUrl
  private url=`${this.baseApiUrl}/api/municipios`

  constructor(private http:HttpClient) { }

  create(municipio:any){
    return this.http.post(this.url,municipio)
  }
  update(id:any,municipio:any){
    return this.http.put(this.url+ "/" +id,municipio)
  }
  getAll():Observable<Provincias[]>{
    return this.http.get<Provincias[]>(this.url)
  }
}
