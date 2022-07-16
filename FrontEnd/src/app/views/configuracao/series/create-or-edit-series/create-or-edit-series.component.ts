import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'createOrEditSerie',
  templateUrl: './create-or-edit-series.component.html',
  styleUrls: ['./create-or-edit-series.component.css']
})
export class CreateOrEditSeriesComponent implements OnInit {

  @Input() modal: any = "createOrEditSerieModal";
  @Input() title: string = "Registar Série";
  @Input() serie: any;

  submitted = false;
  private loading = false;
  public documento_series: any = []

  @Input() documentoSerieForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService
  ) {

    this.documentoSerieForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      tipo_movimento: [null, Validators.required],
      documento_serie_id: [null, Validators.required],
    });
    this.getDocumentoOfSerie()
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
    if (this.serie !== undefined) {
      this.title = "Editar serie";
      this.documentoSerieForm.patchValue(this.serie);
    } else {
      this.title = "Registar Série";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.documentoSerieForm.invalid) {
      return
    }

    this.loading = true;
    const url = this.documentoSerieForm.getRawValue().id == null ? `${this.httpService.apiUrl}/configuracao/series/create` : `${this.httpService.apiUrl}/configuracao/series/update/` + this.documentoSerieForm.getRawValue().id

    this.http
      .post(url, this.documentoSerieForm.value, { headers: this.authService.headers })
      .subscribe(res => {
        this.loading = false;
      })
  }


  getDocumentoOfSerie() {
    this.http.get(`${this.httpService.apiUrl}/configuracao/documento_series/selectBox`, { headers: this.authService.headers })
      .subscribe(res => {
        this.documento_series = Object(res)
      })
  }

}
