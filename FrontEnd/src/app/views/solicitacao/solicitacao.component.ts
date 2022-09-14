import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { BairrosService } from '../configuracao/morada/bairros/bairros.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css'],
})
export class SolicitacaoComponent implements OnInit {
  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0,
    },
  };
  public produto: any = {}
  public tipoSolicitacaos: any = {}
  public cliente: any;
  public Solicitacao: any = [];
  public loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.listaOfSolicitacao();
  }

  public listaOfSolicitacao() {
    this.Solicitacao = []
    this.loading = true;
    this.http.post(`http://127.0.0.1:3333/solicitacao/list`, this.filters).subscribe((res) => {
      this.Solicitacao = Object(res).data;
      this.filters.pagination.lastPage = Object(res).meta.last_page;
      this.filters.pagination.page = Object(res).meta.first_page;
      this.filters.pagination.total = Object(res).meta.total;
      this.filters.pagination.perPage = Object(res).meta.per_page;
      this.loading = false;
      console.log('cliente', this.Solicitacao)
    });
  }

  setCategoria(item: any) {
    this.cliente = item;
  }

  setFacturacao(item: any) {
    console.log("F:",item)
    this.listTipoSolicitacao(item.solicitacao_id)
    this.produto = item;
  }
  setPublicado(item:any){

  }
  getPageFilterData(event: any) {
    console.log(event.target.value)
    if (this.filters.pagination.perPage == null) {
      return;
    }

    // this.filters.pagination.page = Number(event.target.value);
    this.listaOfSolicitacao();
  }

  filterData() {
    this.listaOfSolicitacao();
  }

  listTipoSolicitacao(id: any) {
    console.log("fa",id)
    this.loading = true
    this.http.post(`${this.httpService.api}/tipo-solicitacao/list/${id}`, null)
      .subscribe(res => {
        this.produto = Object(res)
        console.log("res",res, this.produto)
        this.loading = false
      })
  }
}
