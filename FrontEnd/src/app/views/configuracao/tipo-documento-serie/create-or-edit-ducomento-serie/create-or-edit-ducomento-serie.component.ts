import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'createOrEditDucomentoSerie',
  templateUrl: './create-or-edit-ducomento-serie.component.html',
  styleUrls: ['./create-or-edit-ducomento-serie.component.css']
})
export class CreateOrEditDucomentoSerieComponent implements OnInit {
  @Input() modal: any = "createOrEditDucomentoSerieModal";
  @Input() title: string = "Registar Documento Série";
  @Input() documento_serie: any;

  submitted = false;
  private loading = false;

  @Input() documentoSerieForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService
  ) {

    this.documentoSerieForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      sigla: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.documentoSerieForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.documentoSerieForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.documento_serie !== undefined) {
      this.title = "Editar Documento Série";
      this.documentoSerieForm.patchValue(this.documento_serie);
    } else {
      this.title = "Registar Documento Série";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.documentoSerieForm.invalid) {
      return
    }

    this.loading = true;
    const url = this.documentoSerieForm.getRawValue().id == null ? `${this.httpService.apiUrl}/configuracao/documento_series/create` : `${this.httpService.apiUrl}/configuracao/documento_series/update/` + this.documentoSerieForm.getRawValue().id

    this.http
      .post(url, this.documentoSerieForm.value)
      .subscribe(res => {
        this.loading = false;
      })
  }

}
