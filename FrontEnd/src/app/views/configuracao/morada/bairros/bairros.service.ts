import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bairros } from 'src/app/Interfaces/Bairros';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BairrosService {
  private baseApi=environment.apiUrl
  private url=`${this.baseApi}/api/bairros`

  constructor(private http:HttpClient) { }

  create(bairros:any){
    return this.http.post(this.url,bairros)
  }

  update(id:any,bairros:any){
    return this.http.put(this.url+"/"+id,bairros)
  }
  getAllBairros():Observable<Bairros[]>{
    return this.http.get<Bairros[]>(`${this.url}`)
  }
  getAllBairrosById(id: any):Observable<Bairros[]>{
    return this.http.get<Bairros[]>(`${this.url}/${id}`)
  }
}
