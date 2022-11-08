import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { BairrosService } from '../configuracao/morada/bairros/bairros.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0,
    },
  };
  public cliente: any;
  public clientes: any = [];

  public loading = false;

  public estado:  any

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.listaOfClientes();
  }

setCliente(item:any){
  console.log(this.cliente)
  var hoje = new Date()
  var v= new Date(this.cliente?.data_validade)


  if(hoje.valueOf() < v.valueOf()){
    console.log("Valido")
    this.estado=true
  }
  else{
    console.log("Invalido")
    this.estado=false
  }


  console.log("ef",hoje)
  console.log("vf",v)
  this.cliente=item
  console.log("clientes",this.cliente)
}

  public listaOfClientes() {
    // this.clientes = []
    this.loading = true;
    this.http.post(`http://127.0.0.1:3333/clientes/list`, this.filters).subscribe((res) => {
      this.clientes = Object(res).data;
      this.filters.pagination.lastPage = Object(res).meta.last_page;
      this.filters.pagination.page = Object(res).meta.first_page;
      this.filters.pagination.total = Object(res).meta.total;
      this.filters.pagination.perPage = Object(res).meta.per_page;
      this.loading = false;
      console.log('cliente', res)
    });
  }

  setCategoria(item: any) {
    this.cliente = item;
  }

  getPageFilterData(event: any) {
    console.log(event.target.value)
    if (this.filters.pagination.perPage == null) {
      return;
    }

    //this.filters.pagination.page = Number(event.target.value);
    this.listaOfClientes();
  }

  filterData() {
    this.listaOfClientes();
  }
}
