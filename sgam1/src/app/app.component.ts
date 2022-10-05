import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit { 
public Solicitacao:any = []

  public filters = {
      search: null,
      pagination: {
        page: 1,
        perPage: 5,
        total: 0,
        lastPage: 0,
      },
    };
  constructor(private http: HttpService) {
        
  }
  data = new FormControl('')
      ngOnInit():void{
  }


post(){
console.log(this.data.value)
let paginate = {
  page: 1,
  perPage: 5,
  total:0,
  lastPage:0,
}
  this.http.post('http://localhost:3333/solicitacao/list-one',this.filters).subscribe(
    (res:any) => {
      this.Solicitacao = Object(res).dados;
      const isEmpty = this.Solicitacao === 0;
      console.log("emp",isEmpty)
      if(!this.Solicitacao || this.Solicitacao.length===0){
        this.show()
      }  
      console.log('solicitacaos',this.Solicitacao)
    }
  )
}
submit(item: any) {
  console.log('item',item)
}
  title = 'TITLE'
 show(){
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'Sem resultados',
    showConfirmButton: false,
    timer: 3000
  })
 }

 
}
