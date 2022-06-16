import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public SwalSuccess(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public SwalError(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public SwalInfo(title: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  public numberFormat(number: any) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number).replace('€', '').trim();
  }
}
