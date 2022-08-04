import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from './tipo-solicitacao.service';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../../Message/message.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-tipo-solicitacao',
  templateUrl: './tipo-solicitacao.component.html',
  styleUrls: ['./tipo-solicitacao.component.css']
})

export class TipoSolicitacaoComponent implements OnInit {
  public tipoSolicitacaos: any = []
  public provincia:any
  baseApi = environment.apiUrl

  public data = ""


  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public loading = false;

  /*public provincia: any
  public provincias: any = []*/
  constructor(
    private provinciaService: ProvinciaService,
    private messageService: MessageService,
    private router: Router,
    private http: HttpClient,
    private httpService: HttpService,

  ) { }
  ngOnInit(): void {
    //this.loading = tru
    this.listTipoSolicitacao()
  }

  listTipoSolicitacao() {
   this.loading = true
    this.http.post(`${this.httpService.api}/tipo-solicitacao/list`,null)
      .subscribe(res => {
        this.tipoSolicitacaos = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })
  }

 setCategoria(items: any) {
      this.provincia = items;
    }

    getPageFilterData(event: any) {
   }

}
