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
      dataNascimento: [null],
      nomePai: [null],
      nomeMae: [null],
      municipioId: [null],
      distritoId: [null],
      bairroId: [null],
      /* tipoDocumentoId:[null], */
      dataEmissao: [null],
      dataValidade: [null],
      enderecoId: [null],
      estado: [null],
      email: [null],
      residencia: [null],
      estado_cil_id: [null],
      doc_indentificacao: [null],
    });

    this.selectBoxProvinica();
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
      this.title = 'Editar Munícipe';
      this.clienteForm.patchValue({
        id: this.cliente.id,
        nome: this.cliente.nome,
        telefone: this.cliente.telefone,
        generoId: this.cliente.genero_id,
        estado_civil: this.cliente.estado_civil,
        dataNascimento: this.cliente.data_nascimento,
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
        dataEmissao: this.cliente.data_emissao,
        dataValidade: this.cliente.datavalidade,

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

    this.loading = true;
    const url =
      this.clienteForm.getRawValue().id == null
        ? `http://127.0.0.1:3333/clientes/create`
        : `http://127.0.0.1:3333/clientes/update/` +
        this.clienteForm.getRawValue().id;
    console.log(url);
    this.http
      .post(url, this.clienteForm.value, { headers: this.authService.headers })
      .subscribe((res) => {
        this.loading = false;
        this.submitted = false;
        if (Object(res).code == 200) {
          this.configService.SwalSuccess('Cliente registado com sucesso!');
          this.clienteForm.reset();
        }
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
