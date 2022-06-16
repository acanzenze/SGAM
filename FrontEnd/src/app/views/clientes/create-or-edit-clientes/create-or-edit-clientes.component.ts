import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ClientesComponent } from '../clientes.component';

@Component({
  selector: 'createOrEditcliente',
  templateUrl: './create-or-edit-clientes.component.html',
  styleUrls: ['./create-or-edit-clientes.component.css']
})
export class CreateOrEditClientesComponent implements OnInit {
  @Input() modal: any = "createOrEditclienteModal";
  @Input() title: string = "Registar Cliente";
  @Input() cliente: any;
  @Input() clienteForm: FormGroup;

  submitted = false;
  public loading = false;

  public provincias: any = []

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private listOfClienteCom: ClientesComponent
  ) {

    this.clienteForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      tipo_documento_id: [null],
      numero_documento: [null, Validators.required],
      genero: [null, Validators.required],
      data_nascimento: [null, Validators.required],
    });

    this.selectBoxProvinica()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.clienteForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.clienteForm.reset();
  }

  selectBoxProvinica() {
    this.http.get(`${this.httpService.apiUrl}/configuracao/provincias/selectBox`, { headers: this.authService.headers })
      .subscribe(res => {
        this.provincias = Object(res)
      })
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.cliente !== undefined) {
      this.title = "Editar Cliente";
      this.clienteForm.patchValue(this.cliente);
    } else {
      this.title = "Registar Cliente";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.clienteForm.invalid) {
      return
    }

    this.clienteForm.patchValue({ tipo_documento_id: 1 })

    this.loading = true;
    const url = this.clienteForm.getRawValue().id == null ?
      `${this.httpService.apiUrl}/clientes/create` :
      `${this.httpService.apiUrl}/clientes/update/` + this.clienteForm.getRawValue().id

    this.http
      .post(url, this.clienteForm.value, { headers: this.authService.headers })
      .subscribe(res => {
        this.loading = false;
        this.submitted = false
        if (Object(res).code == 200) {
          this.configService.SwalSuccess('Cliente registado com sucesso!')
          this.clienteForm.reset()
        }
        this.listOfClienteCom.listaOfClientes()
      })
  }

}
