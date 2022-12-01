import { Distritos } from 'src/app/Interfaces/Distrito';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ClientesComponent } from '../clientes.component';
import { environment } from '../../../../environments/environment';
import { MunicipioService } from '../../configuracao/morada/municipios/municipio.service';
import { BairrosService } from '../../configuracao/morada/bairros/bairros.service';
import { DistritosService } from '../../configuracao/morada/distritos/distritos.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'createOrEditcliente',
  templateUrl: './create-or-edit-clientes.component.html',
  styleUrls: ['./create-or-edit-clientes.component.css'],
})
export class CreateOrEditClientesComponent implements OnInit {
  @Input() modal: any = 'createOrEditclienteModal';
  @Input() title: string = 'Registar Munícipe';
  @Input() cliente: any;
  @Input() clienteForm: FormGroup;

  submitted = false;
  public loading = false;

  public provincias: any = [];
  public municipios: any = [];
  distritos: any = [];

  public bairros: any = []
  public bi: string="";

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private Service: MunicipioService,
    private bairrosService: BairrosService,
    private authService: AuthService,
    private distritoService: DistritosService,
    private listOfClienteCom: ClientesComponent
  ) {
    this.clienteForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      numeroDocumento: [null, Validators.required],
      generoId: [null, Validators.required],
      estado_civil: [null, Validators.required],
      dataNascimento: [null,Validators.required],
      nomePai: [null,Validators.required],
      nomeMae: [null,Validators.required],
      municipioId: [null, Validators.required],
      distritoId: [null,Validators.required],
      bairroId: [null,Validators.required],
      /* tipoDocumentoId:[null], */
      dataEmissao: [null,Validators.required],
      dataValidade: [null,Validators.required],
      enderecoId: [null,Validators.required],
      estado: [null],
      email: [null,Validators.email],
    });

    //this.selectBoxProvinica();
  }

  ngOnInit(): void {
    this.listaOfMuicipios();
    this.getDistrito(1)
  }

  listaOfBairro(event: any) {
    if (!event) return
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
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.cliente?.id !== undefined) {

      var nasc=new  Date(this.cliente.data_nascimento)
      var ano_n=nasc.getFullYear()
      var mes_n=String(nasc.getMonth()+1).padStart(2,'0')
      var dia_n=String(nasc.getDate()).padStart(2,'0')
      var date = ano_n+ "-" +mes_n+ "-" +dia_n

      var emissao=new  Date(this.cliente.data_emissao)
      var ano_e=emissao.getFullYear()
      var mes_e=String(emissao.getMonth()+1).padStart(2,'0')
      var dia_e=String(emissao.getDate()).padStart(2,'0')
      var date_e = ano_e+ "-" +mes_e+ "-" +dia_e

      var valide=new  Date(this.cliente.data_validade)
      var ano_v=valide.getFullYear()
      var mes_v=String(valide.getMonth()+1).padStart(2,'0')
      var dia_v=String(valide.getDate()).padStart(2,'0')
      var date_v = ano_v+ "-" +mes_v+ "-" +dia_v

      this.title = 'Editar Munícipe';
      this.clienteForm.patchValue({
        id: this.cliente.id,
        nome: this.cliente.nome,
        telefone: this.cliente.telefone,
        generoId: this.cliente.genero_id,
        estado_civil: this.cliente.estado_civil,
        dataNascimento: date.split('T')[0],
        nomePai: this.cliente.pai,
        email: this.cliente.email,
        nomeMae: this.cliente.mae,
        numeroDocumento: this.cliente.numero_documento,
        estado: this.cliente.estado,
        residencia: this.cliente.residencia,
        enderecoId: this.cliente.endereco,
        municipioId: this.cliente.municipio,
        distritoId: this.cliente.distrito,
        bairroId: this.cliente.bairro,
        /* tipoDocumentoId:, */
        dataEmissao: date_e.split('T')[0],
        dataValidade: date_v.split('T')[0],

      });
    } else {
      this.title = 'Registar Munícipe';
    }
  }


  createOrEdit() {
    this.submitted = true;
    if (this.clienteForm.invalid) {
      return;
    }

    this.clienteForm.patchValue({ tipo_documento_id: 1 });
    const url =
      this.clienteForm.getRawValue().id == null
        ? `http://127.0.0.1:3333/clientes/create`
        : `http://127.0.0.1:3333/clientes/update/` +
        this.clienteForm.getRawValue().id;

    var dtv = new Date(this.clienteForm.controls.dataValidade.value)
    var dte = new Date(this.clienteForm.controls.dataEmissao.value)

    if(dte.valueOf() > dtv.valueOf()){
      alert("Data de emissão não pode ser superior a data de validade do documento")
      return
    }

   this.bi = this.clienteForm.controls.numeroDocumento.value

   if(this.bi.length != 14){
    alert("Numero de bilhete invalido.")
    return
   }

    this.loading = true;

    this.http
      .post(url, this.clienteForm.value, { headers: this.authService.headers })
      .subscribe((res) => {
        this.loading = false;
        this.submitted = false;

        this.clienteForm.reset();
        this.listOfClienteCom.listaOfClientes();
        this.loading = false;
      });
  }

  listaOfMuicipios() {
    this.http.get('http://127.0.0.1:3333/municipios/list').subscribe((res) => {
      this.municipios = Object(res).dados;
    });
  }

  getDistrito(event: any) {
    if (!event.value) return
    this.http
    this.distritoService.getAllDistritosById(event.value)
      .subscribe((res) => {
        this.distritos = Object(res)
      });
  }

}
