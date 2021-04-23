import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { first } from 'rxjs/operators';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService, TOKEN_STORAGE } from './../services/auth.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('AuthInterceptor', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    const interceptor = new AuthInterceptor(service);
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('should add the bearer token', done => {
      const token = 'ima-bear-er-token';
      localStorage.setItem(TOKEN_STORAGE, token);

      client
        .get('boogers')
        .pipe(first())
        .subscribe(response => {
          done();
          expect(response).toBeTruthy();
        });

      const req = http.expectOne({
        method: 'GET',
        url: 'boogers'
      });
      req.flush('response data');

      expect(req.request.url).toBe('boogers');
      expect(req.request.headers.has('AUTHORIZATION')).toBe(true);
    });
  });
});
