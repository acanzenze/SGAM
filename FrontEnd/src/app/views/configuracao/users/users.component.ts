import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public user: any
  public users: any = []
  public loading = false;
  public cor:any

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService,
    private userService:UserService
  ) {
  }

  ngOnInit(): void { 
    this.listaOfUsers();
  }

 public listaOfUsers() {
    this.loading = true
    this.userService.getAllUser()
      .subscribe(res => {
        this.users = Object(res).dados
        console.log("users:",this.users)
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false

        if(this.users.estado==1){
          this.cor="p-3 mb-2 bg-success text-white"
        }
        else{
          this.cor="p-3 mb-2 bg-danger text-white"
        }
        console.log("cor",this.cor)
      })
  }


  setUser(item:any){
    this.user=item 
  }
  getPageFilterData(event: any) {

  }

}
