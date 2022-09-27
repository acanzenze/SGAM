import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { SolicitacaoComponent } from '../solicitacao.component';
import { Route, Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-cancel-solicitacao',
  templateUrl: './cancel-solicitacao.component.html',
  styleUrls: ['./cancel-solicitacao.component.css']
})
export class CancelSolicitacaoComponent implements OnInit {

  private apiUrl: string = environment.apiUrl

  @Input() modal: any = 'CancelSolicitacaoModal'
  @Input() factura:any
  @Input() title:any='Cancelar Solicitação'

  public solicitacao_cancelar:any=[]
  public loading=false
  public produtos:any=[]
  public estado:any


  constructor(private http: HttpClient,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private listOfClienteCom: SolicitacaoComponent,
    ) { }

  ngOnInit(): void {
    this.getCancelado()
  }


  cancelar(){   
    this.http.post(this.apiUrl+"/solicitacao/update/"+this.factura.solicitacao_id,{ ...this.factura, estado: this.estado.id }, { headers: this.authService.headers })
    .subscribe(res=>{
      this.listOfClienteCom.listaOfSolicitacao()
    })
  }

  public getCancelado(){
    this.http.get(this.apiUrl+"/estados/listCancelado").subscribe(res=>{
      this.estado=Object(res).dados
      console.log(this.estado.dados)
    })
  }

}
