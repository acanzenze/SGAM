import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public notificacoes: any = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {
    //this.get_ultimas_notificacoes()
  }

  ngOnInit(): void { }

  logout() {
    this.authService.removeTokenOfUser()
    this.router.navigateByUrl('/login')
  }

  get_ultimas_notificacoes() {
    this.http.get(this.httpService.apiUrl + '/configuracao/ultimas_notificacoes', { headers: this.authService.headers })
      .subscribe(res => {
        this.notificacoes = Object(res)
      })
  }

}
