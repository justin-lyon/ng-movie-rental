import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

const OPEN_ENDPOINTS = ['signup', 'auth/login'];

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

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
    return next.handle(authReq).pipe(
      map(event => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
