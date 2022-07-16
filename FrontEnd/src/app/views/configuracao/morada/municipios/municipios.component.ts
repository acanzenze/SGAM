import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ProvinciaService } from '../provincias/provincia.service';
import { MunicipioService } from './municipio.service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public municipio: any
  public municipios: any = []
  public loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
    private municipioService:MunicipioService,
    private provinciaService:ProvinciaService
  ) {
  }

  ngOnInit(): void {
    this.listaOfMuicipios();
   }

  listaOfMuicipios() {
    this.loading = true
    this.municipioService.getAll()
      .subscribe(res => {
        this.municipios = Object(res).dados
        console.log(this.municipios)
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
    this.municipio = item;
  }

  getPageFilterData(event: any) {

  }

}
