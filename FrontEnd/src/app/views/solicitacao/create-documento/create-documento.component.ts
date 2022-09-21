import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { SolicitacaoComponent } from '../solicitacao.component';

@Component({
  selector: 'app-create-documento',
  templateUrl: './create-documento.component.html',
  styleUrls: ['./create-documento.component.css']
})
export class CreateDocumentoComponent implements OnInit {
  @Input() factura:any
  @Input() modal: any = 'EmitirDocumentoModal'
  @Input() title: any = 'Emitir Documento'

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

  emitir(){
    console.log('factura')
    return
    this.http.post(this.apiUrl+"/documento/create",{ ...this.factura, is_publicado: true }, { headers: this.authService.headers })
    .subscribe(res=>{})
    this.listOfClienteCom.listaOfSolicitacao()
  }

}
