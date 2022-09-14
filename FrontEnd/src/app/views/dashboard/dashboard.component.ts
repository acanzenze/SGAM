import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private apiUrl: string = environment.apiUrl
  private url = `${this.apiUrl}/api/provincias`

  public clientes: any;
  public f_hoje: any;
  public f_ontem: any;
  public f_geral: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCliente();
    this.getFHoje();
    this.getFOntem();
    this.getFGeral();
  }

  getCliente(){
    this.http.post(this.apiUrl+"/clientes/count",null).subscribe(res => {
      this.clientes = Object(res)
      //console.log(this.clientes.dados)
    })
  }
  getFHoje(){
    this.http.post(this.apiUrl+"/factura/totalhoje",null).subscribe(res=>{
      this.f_hoje=Object(res)
    })
  }
  getFOntem(){
    this.http.post(this.apiUrl+"/factura/totalontem",null).subscribe(res=>{
      this.f_ontem=Object(res)
    })
  }
  getFGeral(){
    this.http.post(this.apiUrl+"/factura/totalgeral",null).subscribe(res=>{
      this.f_geral=Object(res)
    })
  }

}
