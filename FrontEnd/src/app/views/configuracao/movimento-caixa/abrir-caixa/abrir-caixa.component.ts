import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'abrirCaixa',
  templateUrl: './abrir-caixa.component.html',
  styleUrls: ['./abrir-caixa.component.css']
})
export class AbrirCaixaComponent implements OnInit {

  @Input() modal: any = "abrirCaixaModal";
  @Input() title: string = "Abrir Caixa";
  @Input() categoria: any;

  submitted = false;
  private loading = false;

  @Input() abriCaixaForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private configService: ConfigService
  ) {

    this.abriCaixaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      valor_abertura: [null, Validators.required],
      user_id: [null],
      is_active: [null]
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.abriCaixaForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.abriCaixaForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.categoria !== undefined) {
      this.title = "Abrir Caixa";
      this.abriCaixaForm.patchValue(this.categoria);
    } else {
      this.title = "Abrir Caixa";
    }
  }

  abrirCaixa() {

    this.submitted = true

    if (this.abriCaixaForm.invalid) {
      return
    }

    this.loading = true;
    const url = `${this.httpService.apiUrl}/caixas/abrir`

    this.http
      .post(url, this.abriCaixaForm.value, { headers: this.authService.headers })
      .subscribe(res => {
        if (Object(res).code == 200) {
          this.configService.SwalSuccess(Object(res).message)
        }
        if (Object(res).code == 201) {
          this.configService.SwalError(Object(res).message)
        }
        this.loading = false;
      })
  }

}
