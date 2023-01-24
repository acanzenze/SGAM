import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLogged = false
  private currentUserValue: any;


  private token: any = sessionStorage.getItem('sessionToken') ? JSON.parse(sessionStorage.getItem('sessionToken') || '') : {}

  public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token.token}`)

  constructor(
    private router: Router,
    private _http_client: HttpClient,
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    console.log(this.token.token)

  }

  signIn(user: any) {

    this._http_client.post<any>(
      `${this.httpService.api}/login`,
      user
    ).subscribe(
      response => {
        console.log(response)
        let data = response
        sessionStorage.setItem('sessionToken', JSON.stringify(data.token))
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        this.userLogged = true

        this.configService.SwalSuccess('Sessão iniciada com sucesso')
        this.router.navigateByUrl('/dashboard')
      },
      (error) => {
        console.log("Erro ao acessar",error.status)
        if(error.status==405){
          this.configService.SwalInfo('Utilizador bloqueiado')
        }
        else if (!error.ok) {
          this.userLogged = false
          this.configService.SwalError('Senha ou e-mail invalido')
          this.router.navigate(['/'])
        }
      }
    )
  }

  canActivateRouterLink(permission: string): boolean {
    const currentUser = this.current_user();
    if (currentUser.permissions.includes(permission)) {
      return true;
    } else {
      return false;
    }
  }


  public current_user(): any {
    let data: any = sessionStorage.getItem('currentUser')
    let response = JSON.parse(data)
    return response
  }

  removeTokenOfUser() {
    sessionStorage.removeItem('currentUser')
    sessionStorage.removeItem('sessionToken')
    this.userLogged = false
    this.router.navigateByUrl('/')
  }
}
