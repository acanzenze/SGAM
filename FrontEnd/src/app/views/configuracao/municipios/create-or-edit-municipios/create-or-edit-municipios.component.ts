import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';
import { ProvinciaService } from '../../provincias/provincia.service';
import { MunicipioService } from '../municipio.service';

@Component({
  selector: 'createOrEditMunicipio',
  templateUrl: './create-or-edit-municipios.component.html',
  styleUrls: ['./create-or-edit-municipios.component.css']
})
export class CreateOrEditMunicipiosComponent implements OnInit {

  @Input() modal: any = "createOrEditMunicipioModal";
  @Input() title: string = "Registar Municipios";
  @Input() municipio: any;
  @Input() municipioForm: FormGroup;

  submitted = false;
  public loading = false;

  public provincias: any = []

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private municipioService:MunicipioService,
    private provinciaService:ProvinciaService
  ) {

    this.municipioForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      estado: [null, Validators.required],
      provincia_id: [null, Validators.required],
    });

    this.selectBoxProvinica()
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f() {
    return this.municipioForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.municipioForm.reset();
  }

  selectBoxProvinica() {
    this.provinciaService.getAllProvincia()
      .subscribe(res => {
        this.provincias = Object(res).dados
        console.log(this.provincias)
      })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.municipio !== undefined) {
      this.title = "Editar Municipicio";
      this.municipioForm.patchValue(this.municipio);
    } else {
      this.title = "Registar Municipicio";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.municipioForm.invalid) {
      return
    }

    this.loading = true;

    if(this.municipioForm.getRawValue().id==null){
      this.municipioService.create(this.municipioForm.value).subscribe(res=>{
        console.log(res)
      })
    }
    else{
      console.log("entrou")
      this.municipioService.update(this.municipioForm.getRawValue().id,this.municipioForm.value).subscribe(res=>{
        console.log(res)
      })
    }
    
    this.loading = false;
  
  }

}
