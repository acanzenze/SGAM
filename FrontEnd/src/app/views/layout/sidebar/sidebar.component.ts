import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public currentUser: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let data: any = sessionStorage.getItem('currentUser')
    this.currentUser = JSON.parse(data)
  }


}
