import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../providers/http.service';

@Component({
  selector: 'app-listagem-de-factura',
  templateUrl: './listagem-de-factura.component.html',
  styleUrls: ['./listagem-de-factura.component.css']
})
export class ListagemDeFacturaComponent implements OnInit {

  
  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public produto: any = {}
  public facturas: any = []
  public produtos: any = []
  public loading = false;

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.listFacturas();
  }

  ngOnInit(): void { }

  searchProdutos() {
    this.listFacturas()
  }

  public listFacturas() {
    this.loading = false
    this.http.post(`${this.httpService.api}/factura/list`, this.filters)
      .subscribe(res => {
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.facturas = Object(res).data
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.produto = item;
  }

  getPageFilterData(event: any) {

  }


}

