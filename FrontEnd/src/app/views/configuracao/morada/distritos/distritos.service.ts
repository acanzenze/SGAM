import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Distritos } from 'src/app/Interfaces/Distrito';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistritosService {
  private baseApi=environment.apiUrl
  private url=`${this.baseApi}/api/distritos`

  constructor(private http:HttpClient) { }

  create(distrito:any){
    return this.http.post(this.url,distrito)
  }

  update(id:any,distrito:any){
    return this.http.put(this.url+"/"+id,distrito)
  }
  getAllDistritos():Observable<Distritos[]>{
    return this.http.get<Distritos[]>(`${this.url}`)
  }
  getAllDistritosById(id: any):Observable<Distritos[]>{
    return this.http.get<Distritos[]>(`${this.url}/${id}`)
  }
}
