import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from './provincia.service';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { MessageService } from '../../Message/message.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})

export class ProvinciasComponent implements OnInit {
  public provincias: any = []
  public provincia:any
  baseApi = environment.apiUrl

  public data = ""


  /*public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }*/

  public loading = false;

  /*public provincia: any
  public provincias: any = []*/
  constructor(
    private provinciaService: ProvinciaService,
    private messageService: MessageService,
    private router: Router

  ) { }
  ngOnInit(): void {
    //this.loading = true
    this.provinciaService.getAllProvincia().subscribe(items => {
      this.provincias = Object(items).dados
      console.log(this.provincias)
    })
  }

  listaOfProvincias() {
    /*this.loading = true
    this.http.get(`${this.httpService.apiUrl}/configuracao/provincias/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.provincias = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })*/
  }

  setCategoria(items: any) {
     this.provincia = items;
   }
 
   getPageFilterData(event: any) {
   }

}
