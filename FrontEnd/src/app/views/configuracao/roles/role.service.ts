import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/Interfaces/Role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseApi=environment.apiUrl
  private url=`${this.baseApi}/api/perfils`

  constructor(private http:HttpClient) { }

  create(perfil:any){
    return this.http.post(this.url,perfil)
  }
  update(id:any,perfil:any){
    return this.http.put(this.url+"/"+id,perfil)
  }

  getAllPerfil():Observable<Roles>{
    return this.http.get<Roles>(this.url)
  }
}
