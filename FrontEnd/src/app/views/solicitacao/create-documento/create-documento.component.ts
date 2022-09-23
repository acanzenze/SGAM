import { formatDate } from '@angular/common';
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
  @Input() factura: any
  @Input() modal: any = 'EmitirDocumentoModal'
  @Input() title: any = 'Emitir Documento'

  private apiUrl: string = environment.apiUrl
  public instituicao: any
  public codigo: any
  public estado: any

  public hoje = new Date()

  public hoje_f = formatDate(this.hoje, 'yyyy-MM-dd', 'en-US');

  public data_validade = new Date(this.hoje.getTime());


  constructor(
    private listOfClienteCom: SolicitacaoComponent,
    private http: HttpClient,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getInstituicao()
    this.getEstadoEmitido()
    this.data_validade.setDate(this.hoje.getDate() + 30)
  }

  incrementarContador(id: any) {
    this.http.post(this.apiUrl + "/tipo-solicitacao/update/" + id, { ...this.factura, contador: this.factura.contador + 1 }, { headers: this.authService.headers })
      .subscribe(res => { })
  }

  actualizarEstadoSolicitcao(id: any) {
    this.http.post(this.apiUrl + "/solicitacao/update/" + id, { ...this.factura, estado: this.estado.id }, { headers: this.authService.headers })
      .subscribe(res => { })
  }

  getEstadoEmitido() {
    this.http.get(this.apiUrl + "/estados/listEmitido").subscribe(res => {
      this.estado = Object(res).dados
    })
  }



  emitir() {
    this.data_validade.setDate(this.hoje.getDate() + this.factura.validade)
    this.codigo = this.factura.abreviatura + this.factura.contador

    this.http.post(this.apiUrl + "/documento/create", { ...this.factura, solicitacao_id: this.factura.solicitacao_id, assinatura: null, data_validade: formatDate(this.data_validade, 'yyyy-MM-dd', 'en-US'), codigo: this.codigo }, { headers: this.authService.headers })
      .subscribe(res => {
        this.actualizarEstadoSolicitcao(this.factura.solicitacao_id)
        this.incrementarContador(this.factura.tipo_solicitacao_id)
        this.listOfClienteCom.ngOnInit()

      })
  }

  getInstituicao() {
    this.http.get(this.apiUrl + "/api/instituicaos").subscribe(res => {
      this.instituicao = Object(res)
    })
  }

}
