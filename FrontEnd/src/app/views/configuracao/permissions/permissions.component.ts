import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { PermissionsService } from './permissions.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  public permision: any
  public permisions: any = []
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService,
    private permissionService:PermissionsService
  ) {
    this.listaOfPermissions();
  }

  ngOnInit(): void { }

  listaOfPermissions() {
    this.permissionService.getAllPermisson()
      .subscribe(res => {
        this.permisions = Object(res).dados
      })
  }

  setRole(item: any) {
    this.permision = item;
  }

}
