import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { AtestadoService } from 'src/app/providers/atestado.service';

@Component({
  selector: 'app-listar-documento',
  templateUrl: './listar-documento.component.html',
  styleUrls: ['./listar-documento.component.css']
})
export class ListarDocumentoComponent implements OnInit {

  private apiUrl: string = environment.apiUrl

  @Input() modal: any = 'ListarDocumentoModal'
  @Input() factura:any
  @Input() title:any='Listar Documento'

  public documento:any

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private atestadoService:AtestadoService,
  ) { }

  ngOnInit(): void {
    //this.listar()
  }

  listar(){
    this.http.post(this.apiUrl+"/documento/list/"+this.factura.solicitacao_id,null).subscribe(res=>{
      this.documento=Object(res).dados
      console.log("documentos",this.documento)
      console.log("doc",this.factura)
    })
  }

  imprimir(item:any){
    this.atestadoService.print(item)
  }

}
