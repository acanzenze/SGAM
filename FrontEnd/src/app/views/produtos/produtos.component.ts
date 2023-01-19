import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

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
  public produtos: any = []
  public loading = false;
  public currentUser: any;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listaOfProdutos();
  }

  ngOnInit(): void { 
    let data: any = sessionStorage.getItem('currentUser')
    this.currentUser = JSON.parse(data)
  }

  searchProdutos() {
    this.listaOfProdutos()
  }

  public listaOfProdutos() {
    this.loading = false
    this.http.post(`${this.httpService.api}/produto/list`, this.filters)
      .subscribe(res => {
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.produtos = Object(res).dados
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.produto = item;
  }

  getPageFilterData(event: any) {

  }


}
