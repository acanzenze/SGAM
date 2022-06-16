import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public categorias: any
  public categoria: any = []
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService,
  ) {
    this.listaOfCategorias();
  }

  ngOnInit(): void { }

  listaOfCategorias() {
    this.http.get(`${this.httpService.apiUrl}/configuracao/categorias/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.categorias = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
      })
  }

  setCategoria(item: any) {
    this.categoria = item;
  }

  getPageFilterData(event: any) {

  }
}
