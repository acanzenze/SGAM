import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { SolicitacaoComponent } from '../solicitacao.component';

@Component({
  selector: 'app-assinar-documento',
  templateUrl: './assinar-documento.component.html',
  styleUrls: ['./assinar-documento.component.css']
})
export class AssinarDocumentoComponent implements OnInit {

  private apiUrl: string = environment.apiUrl

  @Input() documento: any
  @Input() modal: any = 'AssinarDocumentoModal'
  @Input() title: any = 'Assinar Documento'
  public estado: any

  constructor(
    private listOfClienteCom: SolicitacaoComponent,
    private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getFinalizado()
  }

  assinar(){
    this.getFinalizado()
  
    this.http.post(this.apiUrl+"/documento/update/"+this.documento.documento_id,{ ...this.documento,assinatura:this.documento.logotipo}).subscribe(res=>{
      this.finalizar()
      this.listOfClienteCom.listaOfSolicitacao()
    })
  } 
  public getFinalizado(){
    this.http.get(this.apiUrl+"/estados/listFinalizado").subscribe(res=>{
      this.estado=Object(res).dados
    })
  }
  finalizar(){   
    this.http.post(this.apiUrl+"/solicitacao/update/"+this.documento.solicitacao_id,{ ...this.documento, estado: this.estado.id }, { headers: this.authService.headers })
    .subscribe(res=>{
    })
  }

}
