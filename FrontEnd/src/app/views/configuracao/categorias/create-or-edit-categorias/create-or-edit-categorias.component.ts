import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'createOrEditCategoria',
  templateUrl: './create-or-edit-categorias.component.html',
  styleUrls: ['./create-or-edit-categorias.component.css']
})
export class CreateOrEditCategoriasComponent implements OnInit {

  @Input() modal: any = "createOrEditCategoriaModal";
  @Input() title: string = "Registar Categória";
  @Input() categoria: any;

  submitted = false;
  private loading = false;

  @Input() categoriaForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService
  ) {

    this.categoriaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      descricao: [null, Validators.required],
      designacao: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.categoriaForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.categoriaForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.categoria !== undefined) {
      this.title = "Editar Categória";
      this.categoriaForm.patchValue(this.categoria);
    } else {
      this.title = "Registar Categória";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.categoriaForm.invalid) {
      return
    }

    this.loading = true;
    const url = this.categoriaForm.getRawValue().id == null ? `${this.httpService.apiUrl}/configuracao/categorias/create` : `${this.httpService.apiUrl}/configuracao/categorias/update/` + this.categoriaForm.getRawValue().id

    this.http
      .post(url, this.categoriaForm.value, { headers: this.authService.headers })
      .subscribe(res => {
        this.loading = false;
      })
  }

}
