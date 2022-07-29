import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instituicaos } from 'src/app/Interfaces/Instituicao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {
  private baseApi=environment.apiUrl
  private url=`${this.baseApi}/api/instituicaos`

  constructor(private http:HttpClient) { }

  create(){

  }

  update(){

  }

  getInstituicao():Observable<Instituicaos[]>{
    return this.http.get<Instituicaos[]>(this.url)
  }
}
