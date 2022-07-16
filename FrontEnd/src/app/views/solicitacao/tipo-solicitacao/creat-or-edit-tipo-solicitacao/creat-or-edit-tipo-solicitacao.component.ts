import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { Provincias } from 'src/app/Interfaces/Provincias';
import { HttpService } from 'src/app/providers/http.service';
import { EventEmitter } from '@angular/core';
import { ProvinciaService } from '../tipo-solicitacao.service';


@Component({
  selector: 'creatOrEditProvincia',
  templateUrl: './creat-or-edit-provincias.component.html',
  styleUrls: ['./creat-or-edit-provincias.component.css']
})
export class CreatOrEditProvinciasComponent implements OnInit {

  @Input() modal: any = "creatOrEditProvinciaModal";
  @Input() title: string = "Registar Provincia";
  @Input() provincia: any;
  @Output() onSubmit = new EventEmitter<Provincias>();


  submitted = false;
  public loading = false;

  provinciaForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private provinciaService: ProvinciaService
  ) {

    /*this.provinciaForm = this.fb.group({
      id: new FormControl(''),
      descricao: new FormControl ('',[Validators.required]),
      estado: new FormControl ('',[Validators.required]),
    });*/
  }

  ngOnInit(): void {

    this.provinciaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      estado: [null, Validators.required],
    })
  }

  // convenience getter for easy access to form fields

  get nome() {
    return this.provinciaForm.get("nome")
  }
  get estado() {
    return this.provinciaForm.get("estado")
  }
  get f() {
    return this.provinciaForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.provinciaForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.provincia !== undefined) {
      this.title = "Editar Provincia";
      this.provinciaForm.patchValue(this.provincia);
    } else {
      this.title = "Registar Provincia";
    }
  }

  submit() {
    if (this.provinciaForm.invalid) {
      return
    }

    this.onSubmit.emit(this.provinciaForm.value)
  }
  save() {
    console.log(this.provincia)

    //const url = this.provinciaForm.getRawValue().id == null ? `${this.httpService.apiUrl}/configuracao/provincias/create` : `${this.httpService.apiUrl}/configuracao/provincias/update/` + this.provinciaForm.getRawValue().id
    if (this.provinciaForm.getRawValue().id == null) {
      this.provinciaService.create(this.provinciaForm.value)
        .subscribe(res => {
          console.log(res)
        });
      //this.messageService.add("Registado com sucesso")
    }
    else {
      this.provinciaService.update(this.provinciaForm.getRawValue().id, this.provinciaForm.value)
        .subscribe(res => {
          console.log(res)
        })
    }

  }

}
