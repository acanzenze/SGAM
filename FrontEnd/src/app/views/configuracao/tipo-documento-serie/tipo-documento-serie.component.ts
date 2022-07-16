import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-tipo-documento-serie',
  templateUrl: './tipo-documento-serie.component.html',
  styleUrls: ['./tipo-documento-serie.component.css']
})
export class TipoDocumentoSerieComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public documento_serie: any
  public documento_series: any = []
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.listaOfDocumentoSeries();
  }

  ngOnInit(): void { }

  listaOfDocumentoSeries() {
    this.http.get(`${this.httpService.apiUrl}/configuracao/documento_series/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.documento_series = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
      })
  }

  setCategoria(item: any) {
    this.documento_serie = item;
  }

  getPageFilterData(event: any) {

  }

}
