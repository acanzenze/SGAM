import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'fecharCaixa',
  templateUrl: './fechar-caixa.component.html',
  styleUrls: ['./fechar-caixa.component.css']
})
export class FecharCaixaComponent implements OnInit {

  @Input() modal: any = "fecharCaixaModal";
  @Input() title: string = "Fechar Caixa";
  @Input() categoria: any;

  submitted = false;
  public loading = false;

  public caixas: any = []

  @Input() fecharCaixaForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private configService: ConfigService
  ) {

    this.fecharCaixaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      caixa_id: [null, Validators.required],
      valor_fecho: [null, Validators.required],
      total_vendas: [null],
    })
    //this.selectBoxCaixas()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.fecharCaixaForm.controls;
  }

  selectBoxCaixas() {
    this.http.get(`${this.httpService.apiUrl}/caixas/selectBox`, { headers: this.authService.headers })
      .subscribe(res => {
        this.caixas = Object(res)
      })
  }

  onReset() {
    this.submitted = false;
    this.fecharCaixaForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.categoria !== undefined) {
      this.title = "Fechar Caixa";
      this.fecharCaixaForm.patchValue(this.categoria);
    } else {
      this.title = "Fechar Caixa";
    }
  }

  changeCaixa(event: any) {
    var caixa_id = event.target.value
    this.http.get(this.httpService.apiUrl + '/caixas/total-of-vendas/' + caixa_id, { headers: this.authService.headers })
      .subscribe(res => {
        this.fecharCaixaForm.patchValue({ total_vendas: Object(res).total_vendas })
      })
  }

  fecharCaixa() {

    this.submitted = true
    if (this.fecharCaixaForm.invalid) {
      return
    }

    if (this.fecharCaixaForm.getRawValue().valor_fecho < this.fecharCaixaForm.getRawValue().total_vendas) {
      return this.configService.SwalError("O valor do fecho não deve ser inferior ao total das vendas")
    }

    this.loading = true;
    const url = `${this.httpService.apiUrl}/caixas/fechar`

    this.http
      .post(url, this.fecharCaixaForm.value, { headers: this.authService.headers })
      .subscribe(res => {
        if (Object(res).code == 200) {
          this.configService.SwalSuccess(Object(res).message)
        }
        this.loading = false;
      })
  }

}
