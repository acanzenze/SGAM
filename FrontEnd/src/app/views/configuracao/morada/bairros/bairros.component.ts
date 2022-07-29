import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { DistritosService } from '../distritos/distritos.service';
import { BairrosService } from './bairros.service';

@Component({
  selector: 'app-bairros',
  templateUrl: './bairros.component.html',
  styleUrls: ['./bairros.component.css']
})
export class BairrosComponent implements OnInit {

  public bairro:any;
  public bairros:any=[]
  distritos:any = []
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
    private bairrosService:BairrosService,
    private distritoService:DistritosService
  ) { }

  ngOnInit(): void {
    this.listaOfBairro()

    this.distritoService.getAllDistritos()
      .subscribe(res => {
        this.distritos = Object(res).dados
        console.log(this.distritos)
      })
  }

  listaOfBairro() {

    this.bairrosService.getAllBairros()
      .subscribe(res => {
        this.bairros = Object(res).dados
        console.log(this.bairro)
        // this.filters.pagination.lastPage = Object(res).lastPage;
        // this.filters.pagination.page = Object(res).page;
        // this.filters.pagination.total = Object(res).total;
        // this.filters.pagination.perPage = Object(res).perPage;
        //this.loading = false
      })
  }

  findProvincia(){

  }

  setCategoria(item: any) {
    this.bairro = item;
  }

  getPageFilterData(event: any) {

  }

}
