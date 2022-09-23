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
        if (events.status === 200 || events.status === 201) {
          this.toast.SwalSuccess('')
        } else {
          this.toast.SwalError( " [Erro na comunicação]")
        }
      }
    }),
      catchError((err: any) => {
        // if (err instanceof HttpErrorResponse) {
        this.toast.SwalError("Erro do servidor")
        return throwError(err);
        //}
      })
    )
  }
}
