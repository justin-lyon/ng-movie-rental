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
    it('should POST to /auth/login', async () => {
      const textContent = 'username bearer.token.stuff';
      http.post = jest.fn().mockReturnValue(of(textContent));

      const { email, password } = newUser;
      const result = await service.login(email, password);
      expect(result).toEqual(textContent);
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

  describe('getToken', () => {
    it('should retrieve a token from local storage', () => {
      const storedToken = 'ima.bearer.token';
      localStorage.setItem(TOKEN_STORAGE, storedToken);

      const result = service.getToken();
      expect(result).toEqual(storedToken);
      expect(router.navigate).toHaveBeenCalledTimes(0);
      localStorage.clear();
    });

    it('should navigate to login when token is not in storage', () => {
      const result = service.getToken();
      expect(result).toBeUndefined();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    });
  });
});
