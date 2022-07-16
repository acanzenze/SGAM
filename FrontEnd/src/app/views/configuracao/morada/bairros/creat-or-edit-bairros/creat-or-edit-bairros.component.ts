import { Users } from 'src/app/Interfaces/User';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { BairrosService } from '../bairros.service';

@Component({
  selector: 'app-creat-or-edit-bairros',
  templateUrl: './creat-or-edit-bairros.component.html',
  styleUrls: ['./creat-or-edit-bairros.component.css']
})
export class CreatOrEditBairrosComponent implements OnInit {

  @Input() modal: any = "app-creat-or-edit-bairros";
  @Input() title: string = "Registar Bairro";
  @Input() bairro: any;
  @Input() distritos :any
  @Input() bairroForm: FormGroup;

  public bairros:any=[]
  public submitted=false
  public loading=false

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private bairroservice:BairrosService
  ) {
    this.bairroForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      estado: [1, Validators.required],
      distrito_id: [null, Validators.required],
      user_id: [1]
    });

    this.selectBoxMunicipio()
    this.selectBoxProvinica()
  }

ngOnInit(): void {}

// convenience getter for easy access to form fields
get f() {
  return this.bairroForm.controls;
}

onReset() {
  this.submitted = false;
  this.bairroForm.reset();
}

selectBoxProvinica() {
  this.bairroservice.getAllBairros()
    .subscribe(res => {
      this.bairros = Object(res).dados
     // console.log(this.bairros)
    })
}

ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
  if (this.bairro !== undefined) {
    this.title = "Editar Bairro";
    this.bairroForm.patchValue(this.bairro);
  } else {
    this.title = "Registar Bairro";
  }
}

selectBoxMunicipio(){}

createOrEdit() {

  this.submitted = true
  if (this.bairroForm.invalid) {
    return
  }

  this.loading = true;

  if(this.bairroForm.getRawValue().id==null){
    this.bairroservice.create(this.bairroForm.value).subscribe(res=>{
      console.log(res)
    })
  }else{
    this.bairroservice.update(this.bairroForm.getRawValue().id,this.bairroForm.value).subscribe(res=>{
      console.log(res)
    })
  }

  this.loading = false;

}
}
