import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { HttpService } from 'src/app/providers/http.service';
import { EventEmitter } from '@angular/core';
import { ProvinciaService } from '../tipo-solicitacao.service';


@Component({
  selector: ' CreatOrEditTipoSolicitacao',
  templateUrl: './creat-or-edit-tipo-solicitacao.component.html',
  styleUrls: ['./creat-or-edit-tipo-solicitacao.component.css']
})
export class CreatOrEditTipoSolicitacaoComponent implements OnInit {

  @Input() modal: any = "CreatOrEditTipoSolicitacao";
  @Input() title: string = "Registar Tipo de Solicitação";
  @Input() provincia: any;
  @Output() onSubmit = new EventEmitter<Provincias>();


  submitted = false;
  public loading = false;

  tipoSolicitacaoForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private provinciaService: ProvinciaService
  ) {

    /*this.tipoSolicitacaoForm = this.fb.group({
      id: new FormControl(''),
      descricao: new FormControl ('',[Validators.required]),
      estado: new FormControl ('',[Validators.required]),
    });*/
  }

  ngOnInit(): void {

    this.tipoSolicitacaoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      descricao: [null, Validators.required],
      abreviatura: [null, Validators.required],
      estado: [null, Validators.required],
      validade: [null, Validators.required],
      sla: [null, Validators.required],
    })
  }

  // convenience getter for easy access to form fields

  get nome() {
    return this.tipoSolicitacaoForm.get("descricao")
  }
  get estado() {
    return this.tipoSolicitacaoForm.get("estado")
  }
  get f() {
    return this.tipoSolicitacaoForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.tipoSolicitacaoForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.provincia !== undefined) {
      this.title = "Editar tipo de Solicitação";
      this.tipoSolicitacaoForm.patchValue(this.provincia);
    } else {
      this.title = "Registar tipo de Solicitação";
    }
  }

  submit() {
    if (this.tipoSolicitacaoForm.invalid) {
      return
    }

    this.onSubmit.emit(this.tipoSolicitacaoForm.value)
  }
  save() {
    this.submitted = true;
    if (this.tipoSolicitacaoForm.invalid) {
      return;
    }

    this.tipoSolicitacaoForm.patchValue({ tipo_documento_id: 1 });

    this.loading = true;
    const url =
      this.tipoSolicitacaoForm.getRawValue().id == null
        ? `${this.httpService.api}/tipo-solicitacao/create`
        : `${this.httpService.api}/tipo-solicitacao/update/${this.tipoSolicitacaoForm.getRawValue().id} `
   
    this.http
      .post(url, this.tipoSolicitacaoForm.value)
      .subscribe((res) => {
        this.loading = false;
        this.submitted = false;
        if (Object(res).code == 200) {
          this.tipoSolicitacaoForm.reset();
        }
        this.loading = false;
      });
  
  }

}
