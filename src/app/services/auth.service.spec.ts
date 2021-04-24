import { HttpClient } from '@angular/common/http';

import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { SIGNUP_PATH, PATH, TOKEN_STORAGE, AuthService } from './auth.service';
import { of } from 'rxjs';
import { MockHttpClient } from 'src/mock/ng/mock-http-client.ng';

describe('AuthService', () => {
  const newUser = {
    username: 'bob',
    email: 'bob@myburgers.net',
    password: '123sesamE!'
  };
  let http: HttpClient;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockHttpClient]
    });

    http = TestBed.inject(HttpClient);
    service = TestBed.inject(AuthService);
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
      const { password, ...user } = newUser;
      const savedUser = { id: '1', ...user };

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
    it('should clear token and broadcast', fakeAsync(() => {
      const token = 'the-key-master';
      localStorage.setItem(TOKEN_STORAGE, token);

      service.logout();
      flush();

      const $sub = service.observe().subscribe(data => {
        expect(data).toBe(!!localStorage.getItem(TOKEN_STORAGE));
      });

      expect(localStorage.getItem(TOKEN_STORAGE)).toBeNull();

      $sub.unsubscribe();
    }));
  });

  describe('isLoggedIn', () => {
    it('should broadcast TRUE when token is in localStorage', fakeAsync(() => {
      const token = 'the-key-master';
      localStorage.setItem(TOKEN_STORAGE, token);

      service.isLoggedIn();
      flush();

      const $sub = service.observe().subscribe(data => {
        expect(data).toBe(true);
      });

      $sub.unsubscribe();
    }));

    it('should broadcast FALSE when NO token in localStorage', fakeAsync(() => {
      localStorage.clear();

      service.isLoggedIn();
      flush();

      const $sub = service.observe().subscribe(data => {
        expect(data).toBe(false);
      });

      $sub.unsubscribe();
    }));
  });

  describe('getToken', () => {
    it(`should return the token if it's in localStorage`, () => {
      const token = 'kuchi-kopi-token';
      localStorage.setItem(TOKEN_STORAGE, token);

      const result = service.getToken();
      expect(result).toBe(token);

      localStorage.clear();
    });

    it(`should return undefined if it's NOT in localStorage`, () => {
      const result = service.getToken();
      expect(result).toBeUndefined();
    });
  });
});
