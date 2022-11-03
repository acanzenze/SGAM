import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AtestadoService } from 'src/app/providers/atestado.service';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { SolicitacaoService } from 'src/app/providers/solicitacao.service';
import { environment } from 'src/environments/environment';
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
  private apiUrl: string = environment.apiUrl
  public produto: any = {}
  public cancelar: any = {}
  public tipoSolicitacaos: any = {}
  public cliente: any;
  public Solicitacao: any = [];
  public loading = false;
  public total_abertas = 0
  public total_finalizadas = 0
  public total_canceladas = 0
  public total: any
  public documento:any

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
    private printSolicitacao: SolicitacaoService,
    private printAtestado: AtestadoService
  ) {
  }

  ngOnInit(): void {
    this.listaOfSolicitacao();
    this.getAbertas();
    this.getCanceladas();
    this.getFinalizadas();
    this.getTotal();
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
    });
  }

  setCategoria(item: any) {
    this.cliente = item;
  }

  setFacturacao(item: any) {

    this.listTipoSolicitacao(item.solicitacao_id)
    this.produto = item;
  }
  setDocumento(item:any){
    this.http.post(this.apiUrl+"/documento/list/"+item.solicitacao_id,null).subscribe(res=>{
      this.documento=Object(res).dados
      console.log("documentos",this.documento)
    })
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
    console.log("fa", id)
    this.loading = true
    this.http.post(`${this.httpService.api}/tipo-solicitacao/list/${id}`, null)
      .subscribe(res => {
        this.produto = Object(res)
        //console.log("res",res, this.produto)
        this.loading = false
      })
  }

  print(item:any) {
    this.printSolicitacao.printSolicitacao(item)
    console.log(item)
  }

  printAtestadoPdf(item:any) {
    this.printAtestado.print(item)
  }

  getAbertas() {
    this.http.post(this.apiUrl + "/solicitacao/getabertas", null).subscribe(res => {
      this.total_abertas = Object(res).dados
    })
  }

  getFinalizadas() {
    this.http.post(this.apiUrl + "/solicitacao/getfinalizadas", null).subscribe(res => {
      this.total_finalizadas = Object(res).dados
    })
  }

  getCanceladas() {
    this.http.post(this.apiUrl + "/solicitacao/getcanceladas", null).subscribe(res => {
      this.total_canceladas = Object(res).dados
    })
  }

  getTotal() {
    this.http.post(this.apiUrl + "/solicitacao/gettotal", null).subscribe(res => {
      this.total = Object(res).dados
    })
  }

}
