import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public serie: any
  public series: any = []

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.listaOfSeries();
  }

  ngOnInit(): void { }

  listaOfSeries() {
    this.http.get(`${this.httpService.apiUrl}/configuracao/series/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.series = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
      })
  }

  setCategoria(item: any) {
    this.serie = item;
  }

  getPageFilterData(event: any) {

  }

}
