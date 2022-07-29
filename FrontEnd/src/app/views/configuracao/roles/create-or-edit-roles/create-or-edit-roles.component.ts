import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { RoleService } from '../role.service';

@Component({
  selector: 'createOrEditRole',
  templateUrl: './create-or-edit-roles.component.html',
  styleUrls: ['./create-or-edit-roles.component.css']
})
export class CreateOrEditRolesComponent implements OnInit {

  @Input() modal: any = "createOrEditRoleModal";
  @Input() title: string = "Registar Role";
  @Input() role: any;

  submitted = false;
  private loading = false;
  public roles: any = []

  @Input() roleForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private rolesService: RoleService
  ) {

    this.roleForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      slug: [null, Validators.required],
      estado: [null],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.roleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.roleForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.role !== undefined) {
      this.title = "Editar Role";
      this.roleForm.patchValue(this.role);
    } else {
      this.title = "Registar Role";
    }
  }

  createOrEdit() {
    this.submitted = true
    if (this.roleForm.invalid) {
      return
    }

    this.loading = true;

    if (this.roleForm.getRawValue().id == null) {
      this.rolesService.create(this.roleForm.value).subscribe(res => {
        console.log(res)
      })
    }
    else {
      this.rolesService.update(this.roleForm.getRawValue().id, this.roleForm.value).subscribe(res => {
        this.roles = Object(res).dados
        console.log(this.role)
      })
    }
    this.submitted = false
    this.loading = false;
  }

}
