import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ProdutosComponent } from '../produtos.component';

@Component({
  selector: 'createOrEditProduto',
  templateUrl: './create-or-edit-produtos.component.html',
  styleUrls: ['./create-or-edit-produtos.component.css']
})
export class CreateOrEditProdutosComponent implements OnInit {

  @Input() modal: any = "createOrEditProdutoModal";
  @Input() title: string = "Registar Produto";
  @Input() produto: any;
  @Input() produtoForm: FormGroup;

  submitted = false;
  public loading = false;
  public categorias: any = []
  public tipoSolicitacaos: any = []

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private listOfPodutoComp: ProdutosComponent
  ) {

    this.produtoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      preco: [null, Validators.required],
      quantidade: [null, Validators.required],
      tipo_solicitacao_id: [null, Validators.required],
      codigo: [null],
      categoria_id: [null],
      descricao: [null],
    });

    this.selectBoxCategorias()
  }

  ngOnInit(): void {
    this.listTipoSolicitacao()
   }

  // convenience getter for easy access to form fields
  get f() {
    return this.produtoForm.controls;
  }
  listTipoSolicitacao() {
    this.loading = true
     this.http.post(`${this.httpService.api}/tipo-solicitacao/list`,null)
       .subscribe(res => {
         this.tipoSolicitacaos = Object(res).data
         this.loading = false
       })
   }
  onReset() {
    this.submitted = false;
    this.produtoForm.reset();
  }

  selectBoxCategorias() {
    this.http.get(`${this.httpService.api}/configuracao/categorias/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.categorias = Object(res).data
      })
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.produto !== undefined) {
      this.title = "Editar Produto";
      this.produtoForm.patchValue(this.produto);
    } else {
      this.title = "Registar Produto";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.produtoForm.invalid) {
      return
    }

    this.produtoForm.patchValue({ tipo_documento_id: 1 })

    this.loading = true;
    const url = this.produtoForm.getRawValue().id == null ?
      `${this.httpService.api}/produto/create` :
      `${this.httpService.api}/produto/update/` + this.produtoForm.getRawValue().id

    this.http
      .post(url, this.produtoForm.value, { headers: this.authService.headers })
      .subscribe(res => {
        this.submitted = false
        if (Object(res).code == 200) {
          this.configService.SwalSuccess('Produto registado com sucesso!')
          this.produtoForm.reset()
        }
        this.loading = false;
        this.listOfPodutoComp.listaOfProdutos()
      })
  }

}
