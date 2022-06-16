import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin: any = {
    username: null,
    password: null
  }

  isLoggedIn: boolean = sessionStorage.getItem('sessionToken') ? true : false


  constructor(
    private _authService: AuthService,
    private configService: ConfigService,
    private router: Router
  ) {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/dashboard')
    }
  }

  ngOnInit(): void {
  }

  _signIn() {
    if (this.admin.username == null) {
      this.configService.SwalSuccess("O campo E-mail é obrigatório")
      return
    }

    if (this.admin.password == null) {
      this.configService.SwalSuccess("O campo Senha é obrigatório")
      return
    }

    this._authService.signIn(this.admin)
  }

}
