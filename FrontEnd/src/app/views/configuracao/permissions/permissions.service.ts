import { useAnimation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permisions } from 'src/app/Interfaces/Permission';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private baseApi=environment.apiUrl
  private url=`${this.baseApi}/api/permissaos`

  constructor(private http:HttpClient) { }

  create(permission:any){
    return this.http.post(this.url,permission)
  }

  update(id:any,permission:any){
    return this.http.put(this.url+"/"+id,permission)
  }

  getAllPermisson():Observable<Permisions>{
    return this.http.get<Permisions>(this.url)
  }
}
