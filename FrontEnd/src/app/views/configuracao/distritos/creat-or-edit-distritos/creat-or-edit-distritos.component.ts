import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { DistritosService } from '../distritos.service';

@Component({
  selector: 'app-creat-or-edit-distritos',
  templateUrl: './creat-or-edit-distritos.component.html',
  styleUrls: ['./creat-or-edit-distritos.component.css']
})
export class CreatOrEditDistritosComponent implements OnInit {

  @Input() modal: any = "app-creat-or-edit-distritos";
  @Input() title: string = "Registar Distrito";
  @Input() distrito: any;
  @Input() distritoForm: FormGroup;

  public distritos:any=[]
  public submitted=false
  public loading=false

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private distritoService:DistritosService
  ) {
    this.distritoForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      estado: [null, Validators.required],
      provincia_id: [null, Validators.required],
    });

    this.selectBoxMunicipio()
    this.selectBoxProvinica()
  }

ngOnInit(): void {}

// convenience getter for easy access to form fields
get f() {
  return this.distritoForm.controls;
}

onReset() {
  this.submitted = false;
  this.distritoForm.reset();
}

selectBoxProvinica() {
  this.distritoService.getAllDistritos()
    .subscribe(res => {
      this.distritos = Object(res).dados
      console.log(this.distritos)
    })
}

ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
  if (this.distrito !== undefined) {
    this.title = "Editar Distrito";
    this.distritoForm.patchValue(this.distrito);
  } else {
    this.title = "Registar Distrito";
  }
}

selectBoxMunicipio(){}

createOrEdit() {

  this.submitted = true
  if (this.distrito.invalid) {
    return
  }

  this.loading = true;

  if(this.distritoForm.getRawValue().id==null){
    this.distritoService.create(this.distritoForm.value).subscribe(res=>{
      console.log(res)
    })
  }
  else{
    console.log("entrou")
    this.distritoService.update(this.distritoForm.getRawValue().id,this.distritoForm.value).subscribe(res=>{
      console.log(res)
    })
  }
  
  this.loading = false;

}
}