import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-faturacao',
  templateUrl: './faturacao.component.html',
  styleUrls: ['./faturacao.component.css']
})
export class FaturacaoComponent implements OnInit {

  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public produto: any
  public clientes: any = []
  public produtos: any = [
    { nome: 'Arroz', preco: '20.000kz', quantidade: '10', categoria: 'Sereais', created_at: '02.05.2022' }
  ]
  public loading = false;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listaOfClientes();
  }

  ngOnInit(): void { }

  searchProdutos() {
    this.listaOfClientes()
  }

  public listaOfClientes() {
    this.loading = false
    this.http.post(`${this.httpService.api}/clientes/list`, this.filters)
      .subscribe(res => {
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.clientes = Object(res).data
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.produto = item;
  }

  getPageFilterData(event: any) {
    this.listaOfClientes()
  }


}
