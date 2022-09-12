import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-create-or-edit-factura',
  templateUrl: './create-or-edit-factura.component.html',
  styleUrls: ['./create-or-edit-factura.component.css']
})
export class CreateOrEditFacturaComponent implements OnInit {
  @Input() factura: any
  @Input() modal: any = 'createOrEditFacturaModal'
  @Input() title: string = "Registar Factura";

  submitted = false;
  public loading = false;
  public categorias: any = []
  public produtos: any = []
  public series: any = []
  public tipoSolicitacaos: any = []
  facturacaoForm: FormGroup

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
  ) {

    this.facturacaoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      produto: [null],
      tipo_solicitacao: [null],
      serie_id: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    console.log('factura', this.factura)
    this.listaOfProdutos()
    // this.listTipoSolicitacao(this.factura.tipo_solicitacao_id)
    this.listSerie()
  }
  get f() {
    return this.facturacaoForm.controls;
  }
  setFacturaData(target: any) {
    let produto_id = target.value || null
    let produto = this.produtos.filter((item: any) => item.id == produto_id)
    console.log(this.facturacaoForm.value)
    this.factura = { ...this.factura, ...produto[0] }
  }

  listTipoSolicitacao(id: any) {
    this.loading = true
    this.http.post(`${this.httpService.api}/tipo-solicitacao/list/${id}`, null)
      .subscribe(res => {
        this.tipoSolicitacaos = Object(res).data
        console.log(res)
        this.loading = false
      })
  }

  listSerie() {
    this.loading = true
    this.http.post(`${this.httpService.api}/serie/list`, null)
      .subscribe(res => {
        this.series = Object(res)
        this.loading = false
      })
  }


  public listaOfProdutos() {
    this.loading = false
    this.http.post(`${this.httpService.api}/produto/list`, null)
      .subscribe(res => {
        this.produtos = Object(res)
        this.loading = false
      })
  }

  onReset() {
    this.submitted = false;
    this.facturacaoForm.reset();
  }

  updateSolicitacao(id: number) {
    const url = `${this.httpService.api}/solicitacao/update/${id}`
    this.http
      .post(url, { ...this.factura, is_facturado: true }, { headers: this.authService.headers })
      .subscribe(res => { })
  }

  createOrEdit() {

    this.factura = { ...this.factura, ...this.facturacaoForm.value, total: this.factura.preco }

    this.submitted = true
    if (this.facturacaoForm.invalid) {
      return
    }

    this.loading = true;
    const url = `${this.httpService.api}/factura/create`

    this.http
      .post(url, this.factura, { headers: this.authService.headers })
      .subscribe(res => {
        this.submitted = false
        if (Object(res).status == 201) {
          this.configService.SwalSuccess('Produto registado com sucesso!')
        }
        this.updateSolicitacao(this.factura.solicitacao_id)
        this.facturacaoForm.reset()
        this.factura = {
          produto: null,
          tipo_solicitacao: null,
          preco: null
        }
        this.loading = false;
      })
  }

}
