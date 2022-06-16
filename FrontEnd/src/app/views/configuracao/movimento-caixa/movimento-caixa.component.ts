import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-movimento-caixa',
  templateUrl: './movimento-caixa.component.html',
  styleUrls: ['./movimento-caixa.component.css']
})
export class MovimentoCaixaComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public caixa: any
  public caixas: any = []
  public loading = false;

  constructor(
    private http: HttpClient,
    public configService: ConfigService,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    //this.listaOfMovimentoCaixa();
  }

  ngOnInit(): void { }

  listaOfMovimentoCaixa() {
    this.loading = true
    this.http.get(`${this.httpService.apiUrl}/caixas/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.caixas = Object(res).data.data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })
  }

  setCaixa(item: any) {
    this.caixa = item;
  }

  getPageFilterData(event: any) {

  }

}
