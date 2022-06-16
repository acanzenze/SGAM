import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/Interfaces/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApi=environment.apiUrl
  private url=`${this.baseApi}/api/users`

  constructor(private http:HttpClient) { }

  create(user:any){
    return this.http.post(this.url,user)
  }

  update(id:any,user:any){
    return this.http.put(this.url+"/"+id,user)
  }

  getAllUser():Observable<Users[]>{
    return this.http.get<Users[]>(this.url)
  }
}
