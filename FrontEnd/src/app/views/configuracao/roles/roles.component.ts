import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { RoleService } from './role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public role: any
  public roles: any = []
  public permisions: any = []

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private configService: ConfigService,
    private authService: AuthService,
    private roleService:RoleService
  ) {
    this.listaOfRoles();
  }

  ngOnInit(): void { }

  listaOfRoles() {
    this.roleService.getAllPerfil()
      .subscribe(res => {
        this.roles = Object(res).dados
      })
  }

  listaOfPermissions() {
    this.http.get(`${this.httpService.apiUrl}/configuracao/permissions/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.permisions = Object(res).dados
        this.init_permission(this.permisions)
      })
  }


  public _permisions: any = []

  init_permission(permisions: any) {
    let permisions_merge = []
    this._permisions = []

    for (let permision of permisions) {
      var prop = { role_assocido: this.role.id }
      permisions_merge.push({ ...permision, ...prop })
    }

    permisions_merge.forEach(permision => {
      this._permisions.push(permision);
    });
  }

  setRole(item: any) {
    this.role = item;
  }

  associarRolePermision(permision: any) {
    this.http.post(`${this.httpService.apiUrl}/configuracao/associar/role/permission`,
      {
        role_id: this.role.id,
        permission_id: permision.id
      }, { headers: this.authService.headers }).subscribe(res => {
        if (Object(res).code == 200) {
          this.configService.SwalSuccess('Permissão associada com sucesso!')
        }
      })

  }
}
