import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers
      .set('X-DBP-APIKEY', environment.apiKey);

    const authReq = req.clone({ headers });
    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(event);
        }
      })
    );
  }
}
