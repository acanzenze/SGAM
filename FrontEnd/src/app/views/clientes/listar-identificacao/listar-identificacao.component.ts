import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-identificacao',
  templateUrl: './listar-identificacao.component.html',
  styleUrls: ['./listar-identificacao.component.css']
})
export class ListarIdentificacaoComponent implements OnInit {

  @Input() modal: any = 'ListarIdentificacaoModal'
  @Input() cliente:any
  @Input() title:any='Listar Documento'

  constructor() { }

  ngOnInit(): void {
    console.log(this.cliente)
  }

}
