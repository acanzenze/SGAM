import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { SolicitacaoComponent } from '../solicitacao.component';

@Component({
  selector: 'app-publicar-solicitacao',
  templateUrl: './publicar-solicitacao.component.html',
  styleUrls: ['./publicar-solicitacao.component.css']
})
export class PublicarSolicitacaoComponent implements OnInit {
  @Input() factura:any
  @Input() modal: any = 'PublicarSolicitacaoModal'
  @Input() title: any = 'Publicar Solicitação'

  private apiUrl: string = environment.apiUrl

  constructor(
    private listOfClienteCom:SolicitacaoComponent,
    private http: HttpClient,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  publicar(){
    this.http.post(this.apiUrl+"/solicitacao/update/"+this.factura.solicitacao_id,{ ...this.factura, is_publicado: true }, { headers: this.authService.headers })
    .subscribe(res=>{})
    this.listOfClienteCom.listaOfSolicitacao()
  }

}
