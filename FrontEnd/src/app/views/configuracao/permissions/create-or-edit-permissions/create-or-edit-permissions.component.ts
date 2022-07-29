import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { PermissionsService } from '../permissions.service';

@Component({
  selector: 'createOrEditPermission',
  templateUrl: './create-or-edit-permissions.component.html',
  styleUrls: ['./create-or-edit-permissions.component.css']
})
export class CreateOrEditPermissionsComponent implements OnInit {

  @Input() modal: any = "createOrEditRoleModal";
  @Input() title: string = "Registar Role";
  @Input() permision: any;

  submitted = false;
  private loading = false;
  public permissions: any = []

  @Input() permisionForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private permissionService: PermissionsService
  ) {

    this.permisionForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      slug: [null, Validators.required],
      estado:[null,Validators.required],
      descrcao: [null],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.permisionForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.permisionForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.permision !== undefined) {
      this.title = "Editar Permissão";
      this.permisionForm.patchValue(this.permision);
    } else {
      this.title = "Registar Permissão";
    }
  }

  createOrEdit() {
    this.submitted = true
    if (this.permisionForm.invalid) {
      return
    }

    this.loading = true;

    if (this.permisionForm.getRawValue().id == null) {
      this.permissionService.create(this.permisionForm.value).subscribe(res => {
        console.log(res)
        if (Object(res).code == 201) {
          this.configService.SwalSuccess('permissão registado com sucesso!')
        }
      })
    }
    else {
      this.permissionService.update(this.permisionForm.getRawValue().id, this.permisionForm.value).subscribe(res => {
        this.permissions = Object(res).dados
        console.log(this.permissions)
        if (Object(res).code == 200) {
          this.configService.SwalSuccess('permissão actualizada com sucesso!')
        }
      })
    }
  }
}
