import { PATH, AuthService } from './../services/auth.service';
import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { BASE_URL, ApiInterceptor } from './api.interceptor';

describe('ApiInterceptor', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true
        }
      ]
    });

    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    const interceptor = new ApiInterceptor();
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('should prepend the server url', () => {
      service.login('username', 'email');
      const req = http.expectOne({
        method: 'POST',
        url: 'http://localhost:9191/auth/login'
      });
      expect(req.request.url).toBe(`${BASE_URL}/${PATH}`);
    });
  });
});
