import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { MessageService } from 'src/app/views/Message/message.service';
import { environment } from 'src/environments/environment';
import { InstituicaoService } from '../../instituicao/instituicao.service';
import { RoleService } from '../../roles/role.service';
import { UserService } from '../user.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-alter-passwor',
  templateUrl: './alter-passwor.component.html',
  styleUrls: ['./alter-passwor.component.css']
})
export class AlterPassworComponent implements OnInit {

  @Input() modal: any = "EditUser";
  @Input() title: string = "Editar User";
  @Input() user: any;

  @Input() userForm: FormGroup;
  @Input() ocultar: string = "Sim"

  submitted = false;
  public loading = false;

  public roles: any = []
  public instituicaos: any = []

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private rolesService: RoleService,
    private instituicaoService: InstituicaoService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private usersComp: UsersComponent
  ) {

    this.userForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      //username: [null, Validators.required],
      email: [null, Validators.compose([Validators.required])],
      //password: [null, Validators.required],
      perfil_id: [null, Validators.required],
      instituicao_id: [null, Validators.required],
      estado: [null],
      //confirmPassword: [null,Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectBoxRoles()
    this.selectBoxInstituicaos();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }


  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
  resetOcultarForm(){
    this.ocultar="Sim"
  }

  selectBoxRoles() {
    this.rolesService.getAllPerfil()
      .subscribe(res => {
        this.roles = Object(res).dados
        console.log(this.roles)
      })
  }

  selectBoxInstituicaos() {
    this.instituicaoService.getInstituicao().subscribe(res => {
      this.instituicaos = Object(res).dados
      console.log(this.instituicaos)
    })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.user) {
      this.title = "Editar User";
      this.userForm.patchValue(this.user);
    } 
  }

  alterPassword() {
    console.log("editar user",this.userForm.value)
    this.submitted = true
    
      this.userService.update(this.userForm.getRawValue().id, this.userForm.value).subscribe(res => {
        console.log(res)
        this.loading = false;
        this.submitted = false
      })
    
  }

}
