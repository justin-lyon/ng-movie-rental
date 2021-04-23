import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { first } from 'rxjs/operators';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './../services/auth.service';

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
    service.getToken = jest.fn().mockReturnValue('super-secret-auth-token');
    service.logout = jest.fn();
    http = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    const interceptor = new AuthInterceptor(service);
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('should add the bearer token', done => {
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

      expect(service.getToken).toHaveBeenCalledTimes(1);
      expect(service.logout).toHaveBeenCalledTimes(0);

      expect(req.request.url).toBe('boogers');
      expect(req.request.headers.has('AUTHORIZATION')).toBe(true);
    });

    it('should logout on 401', done => {
      client
        .get('boogers')
        .toPromise()
        .catch(error => {
          done();
          expect(error.status).toBe(401);
        });

      const req = http.expectOne({
        method: 'GET',
        url: 'boogers'
      });
      req.flush('response data', {
        status: 401,
        statusText: 'this is required, so whatever. Unauthorized.'
      });

      expect(service.getToken).toHaveBeenCalledTimes(1);
      expect(service.logout).toHaveBeenCalledTimes(1);
    });

    it('should logout on 403', done => {
      client
        .get('boogers')
        .toPromise()
        .catch(error => {
          done();
          expect(error.status).toBe(403);
        });

      const req = http.expectOne({
        method: 'GET',
        url: 'boogers'
      });
      req.flush('response data', {
        status: 403,
        statusText: 'this is required, so whatever. Forbidden.'
      });

      expect(service.getToken).toHaveBeenCalledTimes(1);
      expect(service.logout).toHaveBeenCalledTimes(1);
    });

    it('should throw error if error is not 401 or 403', done => {
      client
        .get('boogers')
        .toPromise()
        .catch(error => {
          done();
          expect(error.status).toBe(500);
        });

      const req = http.expectOne({
        method: 'GET',
        url: 'boogers'
      });
      req.flush('response data', {
        status: 500,
        statusText: 'this is required, so whatever. Server Error.'
      });

      expect(service.getToken).toHaveBeenCalledTimes(1);
      expect(service.logout).toHaveBeenCalledTimes(0);
    });
  });
});
