import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { SIGNUP_PATH, PATH, TOKEN_STORAGE, AuthService } from './auth.service';
import { of } from 'rxjs';

jest.mock('@angular/router');
jest.mock('@angular/common/http');
describe('AuthService', () => {
  const newUser = {
    username: 'bob',
    email: 'bob@myburgers.net',
    password: '123sesamE!'
  };
  let http: HttpClient;
  let router: Router;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, Router]
    });

    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
    router.navigate = jest.fn().mockResolvedValue(true);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('observe', () => {
    it('should provide an observable', () => {
      const sub = service.observe().subscribe(data => {
        expect(data).toBeFalsy();
      });
      expect(sub).toBeDefined();
      sub.unsubscribe();
    });
  });

  describe('signup', () => {
    it('should POST to /signup', async () => {
      const savedUser = { id: '1', ...newUser };
      delete savedUser.password;

      http.post = jest.fn().mockReturnValue(of(savedUser));

      const result = await service.signup(newUser);
      expect(result).toBe(savedUser);

      expect(http.post).toHaveBeenCalledTimes(1);
      expect(http.post).toHaveBeenCalledWith(SIGNUP_PATH, newUser);
    });
  });

  describe('login', () => {
    it('should POST to /auth/login and broadcast', async () => {
      const textContent = 'username bearer.token.stuff';
      http.post = jest.fn().mockReturnValue(of(textContent));

      const { email, password } = newUser;
      const result = await service.login(email, password);
      expect(result).toEqual(undefined);
      const storedToken = localStorage.getItem(TOKEN_STORAGE);
      expect(storedToken).toBe(textContent.split(' ')[1]);

      expect(http.post).toHaveBeenCalledTimes(1);
      expect(http.post).toHaveBeenCalledWith(
        PATH,
        { email, password },
        { responseType: 'text' }
      );

      localStorage.clear();
    });
  });

  describe('logout', () => {
    it('should clear token and broadcast', () => {
      expect(true).toBeFalsy();
    });
  });

  describe('isLoggedIn', () => {
    it('should check token and broadcast', () => {
      expect(true).toBeFalsy();
    });
  });
});
