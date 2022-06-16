import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { DistritosService } from './distritos.service';

@Component({
  selector: 'app-distritos',
  templateUrl: './distritos.component.html',
  styleUrls: ['./distritos.component.css']
})
export class DistritosComponent implements OnInit {

  public distrito:any;
  public distritos:any=[]

  public loading=false

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
    private distritoService:DistritosService
  ) { }

  ngOnInit(): void {
  }

  listaOfMuicipios() {
    this.loading = true
    this.distritoService.getAllDistritos()
      .subscribe(res => {
        this.distritos = Object(res).dados
        console.log(this.distritos)
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })
  }

  findProvincia(){

  }

  setCategoria(item: any) {
    this.distrito = item;
  }

  getPageFilterData(event: any) {

  }

}
