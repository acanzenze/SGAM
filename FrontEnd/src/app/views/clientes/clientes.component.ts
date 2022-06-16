import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public cliente: any
  public clientes: any = []
  public loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listaOfClientes();
  }

  ngOnInit(): void { }

  public listaOfClientes() {
    this.loading = true
    this.http.get(`${this.httpService.apiUrl}/clientes/listagem?search=${this.filters.search}&page=${this.filters.pagination.page}&perPage=${this.filters.pagination.perPage}`, { headers: this.authService.headers })
      .subscribe(res => {
        this.clientes = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.cliente = item;
  }

  getPageFilterData(event: any) {

  }


}
