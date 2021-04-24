import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockRouter } from 'src/mock/ng/mock-router.ng';

import { AuthService } from './../services/auth.service';
import { AuthGuard } from './auth.guard';

jest.mock('./../services/auth.service');
describe('AuthGuard', () => {
  let authService: AuthService;
  let router: Router;
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, MockRouter]
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    authService.isLoggedIn = jest.fn().mockReturnValue(true);
    router.navigate = jest.fn();

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if logged in', () => {
      const result = guard.canActivate(null, null);

      expect(result).toBe(true);
    });

    it('should call navigate and return false if not logged in', () => {
      authService.isLoggedIn = jest.fn().mockReturnValue(false);

      const result = guard.canActivate(null, null);

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['login']);
      expect(result).toBe(false);
    });
  });
});
