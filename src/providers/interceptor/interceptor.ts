import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { Storage } from '@ionic/storage';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(private _storage: Storage) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let promise = this._storage.get('token');

    return Observable.fromPromise(promise)
      .mergeMap(token => {
        let cloneReq = this.addToken(request, token);
        return next.handle(cloneReq).pipe(
          catchError(error => {
            console.log(error);
            return _throw(error);
          })
        )
      });
  }

  addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`
        }
      });
      return clone;
    }
  }
}
