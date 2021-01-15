import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:9191';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const originalUrl = req.url;
    const apiReq = req.clone({ url: `${BASE_URL}/${originalUrl}` });
    return next.handle(apiReq);
  }
}
