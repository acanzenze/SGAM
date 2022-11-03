import { Distritos } from 'src/app/Interfaces/Distrito';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { SolicitacaoComponent } from '../solicitacao.component';
import { environment } from '../../../../environments/environment';
import { MunicipioService } from '../../configuracao/morada/municipios/municipio.service';
import { BairrosService } from '../../configuracao/morada/bairros/bairros.service';
import { DistritosService } from '../../configuracao/morada/distritos/distritos.service';

@Component({
  selector: 'create-select-solicitacao',
  templateUrl: './create-select-solicitacao.component.html',
  styleUrls: ['./create-select-solicitacao.component.css'],
})
export class CreateSelectSolicitacaoComponent implements OnInit {
  @Input() modal: any = 'createOrEditclienteModal';
  @Input() title: string = 'Registar Solicitação';
  @Input() cliente: any;
  @Input() clienteForm: FormGroup;

  private apiUrl: string = environment.apiUrl

  submitted = false;
  public loading = false;
  public view_client = true

  public provincias: any = [];
  public municipios: any = [];
  public prioridades: any
  public estados:any
  distritos: any = [];
  public filters = {
    search: null
  };
  public bairros: any = []
  public clientes: any = []
  public tipoSolicitacaos: any = []
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private Service: MunicipioService,
    private bairrosService: BairrosService,
    private authService: AuthService,
    private distritoService: DistritosService,
    private listOfClienteCom: SolicitacaoComponent
  ) {
    this.clienteForm = this.fb.group({
      id: [null],
      tipo_solicitacao_id: [null, Validators.required],
      prioridade_id: [null, Validators.required],
      municipe_id: [null,Validators.required],
      nome: [null,Validators.required],
      documento: [null],
      is_publicado: [null],
      is_notificado: [null],
      is_facturado:[null],
      user_id: [null],
      descricao: [null,Validators.required],
      estado_id: [null,Validators.required],
    });

    //this.selectBoxProvinica();
  }

  ngOnInit(): void {
    this.listaOfMuicipios();
    this.getDistrito(1)
    this.listTipoSolicitacao()
    this.getPrioridades();
    this.getEstados();
  }
  listTipoSolicitacao() {
    this.loading = true
     this.http.post(`${this.httpService.api}/tipo-solicitacao/list`,null)
       .subscribe(res => {
         this.tipoSolicitacaos = Object(res).data
         this.loading = false
       })
   }
 

  public setCliente(cliente: any) {
    console.log('client=',cliente)
    this.view_client = false
    this.clienteForm.patchValue({
      id: cliente.solicitacao_id,
      tipo_solicitacao_id: cliente.tipo_solicitacao_id,
      prioridade_id: cliente.prioridade_id,
      municipe_id: cliente.cliente_id,
      documento: cliente.documento,
      is_publicado: cliente.is_publicado,
      is_notificado: cliente.is_notificado,
      is_facturado:cliente.is_facturado,
      user_id: cliente.user_id,
      descricao: cliente.descricao,
      estado_id: cliente.estado_id,
      nome: cliente.nome

    });

    this.cliente = this.clienteForm.value
  }

  listaOfBairro(event: any) {
    if(!event) return
    this.bairrosService.getAllBairrosById(event.value)
      .subscribe(res => {
        this.bairros = Object(res)
      })
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.clienteForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.clienteForm.reset();
  }

  selectBoxProvinica() {
    this.http
      .get(`${this.httpService.apiUrl}/configuracao/provincias/list`, {
        headers: this.authService.headers,
      })
      .subscribe((res) => {
        this.provincias = Object(res);
      });
  }

  public listaOfClientes() {
    this.view_client = true;
    this.clientes = []
    this.loading = true;
    this.filters.search = this.clienteForm.value.nome
    console.log("filtro",this.filters)
    this.http.post(`http://127.0.0.1:3333/clientes/select`, this.filters).subscribe((res) => {
      this.clientes = Object(res);
      this.loading = false;
      console.log('cliente',this.clientes)
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.cliente !== undefined) {
      this.title = 'Editar Cliente';
      console.log(this.cliente)
      this.clienteForm.patchValue({
          id : this.cliente.solicitacao_id,
          tipo_solicitacao_id: this.cliente.tipo_solicitacao_id,
          prioridade_id: this.cliente.prioridade_id,
          municipe_id: this.cliente.municipe_id,
          documento: this.cliente.documento,
          is_publicado: this.cliente.is_publicado,
          is_notificado: this.cliente.is_notificado,
          is_facturado:this.cliente.is_facturado,
          user_id: this.cliente.user_id,
          descricao: this.cliente.motivo,
          estado_id: this.cliente.estado_id,
          nome: this.cliente.cliente

      });
    } else {
      this.title = 'Registar Solicitação';
    }
  }


  createOrEdit() {

    this.submitted = true;
    if (this.clienteForm.invalid) {
      return;
    }

    this.clienteForm.patchValue({ tipo_documento_id: 1 });
    this.loading = true;
    const url =
      this.clienteForm.getRawValue().id == null
        ? `http://127.0.0.1:3333/solicitacao/create`
        : `http://127.0.0.1:3333/solicitacao/update/` +
          this.clienteForm.getRawValue().id;

    this.http
      .post(url, this.clienteForm.value, { headers: this.authService.headers })
      .subscribe((res) => {
        this.loading = false;
        this.submitted = false;
        this.clienteForm.reset();
        this.listOfClienteCom.listaOfSolicitacao();
        this.loading = false;
      });
  }

  listaOfMuicipios() {
    this.http.get('http://127.0.0.1:3333/municipios/list').subscribe((res) => {
      this.municipios = Object(res).dados;
    });
  }

  getDistrito(event:any) {
    if(!event.value) return
    this.http
    this.distritoService.getAllDistritosById(event.value)
      .subscribe((res) => {
        this.distritos = Object(res)
      });
  }

  getPrioridades(){
    this.http.get(this.apiUrl+"/prioridades/list").subscribe(res=>{
       this.prioridades=Object(res).dados
       console.log("Prioridades: ",res)
    })
  }

  getEstados(){
    this.http.get(this.apiUrl+"/estados/listAberto").subscribe(res=>{
       this.estados=Object(res).dados
       console.log("estados: ",res)
    })
  }

}
