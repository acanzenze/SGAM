import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private apiUrl: string = environment.apiUrl
  private url = `${this.apiUrl}/api/provincias`

  public clientes:any;
  public f_hoje: any;
  public f_ontem: any;
  public f_geral:any;
  public currentUser: any;

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getCliente();
    this.getFHoje();
    this.getFOntem();
    this.getFGeral();

    let data: any = sessionStorage.getItem('currentUser')
    this.currentUser = JSON.parse(data)
  }

  getCliente(){
    this.http.post(this.apiUrl+"/clientes/count",null).subscribe(res => {
      this.clientes = Object(res).dados
      //console.log(this.clientes.dados)
    })
  }
  getFHoje(){
    this.http.post(this.apiUrl+"/factura/totalhoje",null).subscribe(res=>{
      this.f_hoje=Object(res).dados
    })
  }
  getFOntem(){
    this.http.post(this.apiUrl+"/factura/totalontem",null).subscribe(res=>{
      this.f_ontem=Object(res).dados
      console.log("otem",this.f_ontem)
    })
  }
  getFGeral(){
    this.http.post(this.apiUrl+"/factura/totalgeral",null).subscribe(res=>{
      this.f_geral=Object(res).dados
    })
  }

}
