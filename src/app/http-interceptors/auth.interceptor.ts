import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

const OPEN_ENDPOINTS = ['signup', 'auth/login'];

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (OPEN_ENDPOINTS.includes(req.url)) {
      return next.handle(req);
    }

    const bearerToken = this.authService.getToken();
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${bearerToken}` }
    });
    return next.handle(authReq);
  }
}
