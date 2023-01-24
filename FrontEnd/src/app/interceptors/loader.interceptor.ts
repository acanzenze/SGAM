import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { ConfigService } from '../providers/config.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private toast: ConfigService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((events: any) => {
      console.log(events)
      if (events instanceof HttpResponse) {
        if (events.status === 201) {
          this.toast.SwalSuccess('Sucesso')
        }
      }
    }),
      catchError((err: any) => {
        // if (err instanceof HttpErrorResponse) {
          console.log(err)
          if (err.status === 401) {
            this.toast.SwalInfo('Já existe um municipe com este documento')
          }
          else if (err.status === 501) {
            this.toast.SwalInfo('Este email já esta registado como usuario')
          }
          else{
            this.toast.SwalError("Erro de comunicação com servidor")
          }
        return throwError(err);
        //}
      })
    )
  }
}
