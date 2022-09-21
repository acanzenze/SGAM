import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../providers/http.service';

@Component({
  selector: 'app-listagem-de-factura',
  templateUrl: './listagem-de-factura.component.html',
  styleUrls: ['./listagem-de-factura.component.css']
})
export class ListagemDeFacturaComponent implements OnInit {

  private apiUrl: string = environment.apiUrl
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
  public total_documentos=0
  public municipes_facturados=0
  public total_facturacao=0
  public documentos_anulados=0

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.listFacturas();
  }

  ngOnInit(): void {
    this.getCountDocMunicipes();
    this.getCountDocumentos();
    this.getFacturacao();
    this.getCountDocAnulados();
   }

  searchProdutos() {
    this.listFacturas()
  }

  public listFacturas() {
    this.loading = false
    this.facturas = []
    console.log(this.filters)
    this.http.post(`${this.httpService.api}/factura/list`, this.filters)
      .subscribe(res => {
        console.log(res)
        this.filters.pagination.lastPage = Object(res).meta.last_page;
        this.filters.pagination.page = Object(res).meta.current_page;
        this.filters.pagination.total = Object(res).meta.total;
        this.filters.pagination.perPage = Object(res).meta.per_page;
        this.facturas = Object(res).data
        this.loading = false
      })

  }

  setCategoria(item: any) {
    this.produto = item;
  }

  getPageFilterData(event: any = null) {
    this.listFacturas()
  }

  getCountDocumentos(){
    this.http.post(this.apiUrl+"/factura/countdocumentos",null).subscribe(res=>{
      this.total_documentos=Object(res).dados
    })
  }

  getCountDocMunicipes(){
    this.http.post(this.apiUrl+"/factura/countdocmunicipe",null).subscribe(res=>{
      this.municipes_facturados=Object(res).dados
    })
  }
  getFacturacao(){
    this.http.post(this.apiUrl+"/factura/totalgeral",null).subscribe(res=>{
      this.total_facturacao=Object(res).dados
    })
  }

  getCountDocAnulados(){
    this.http.post(this.apiUrl+"/factura/countdocanulados",null).subscribe(res=>{
      this.documentos_anulados=Object(res).dados
    })
  }

}

