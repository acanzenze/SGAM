import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-afiliacao',
  templateUrl: './listar-afiliacao.component.html',
  styleUrls: ['./listar-afiliacao.component.css']
})
export class ListarAfiliacaoComponent implements OnInit {

  @Input() modal: any = 'ListarAfiliacaoModal'
  @Input() cliente:any
  @Input() title:any='Listar Afilicação'

  constructor() { }

  ngOnInit(): void {
  }

}
