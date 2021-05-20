import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterMock } from '../../../mock/ng/router.mock';

const newUser = {
  email: 'belcher.louise@hotmail.com',
  password: 'kuchiK0pi!'
};

jest.mock('./../../services/auth.service');
describe('LoginComponent', () => {
  let router: Router;
  let authService: AuthService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [AuthService, RouterMock]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    router.navigate = jest.fn().mockResolvedValue(true);
    authService.login = jest.fn().mockResolvedValue(undefined);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInt', () => {
    it('should init with formGroup with controls', () => {
      expect(component.formGroup).toBeDefined();
      const { email, password } = component.formGroup.value;
      expect(email).toBeDefined();
      expect(password).toBeDefined();
    });

    it('should require email', () => {
      const email = component.formGroup.controls.email;
      email.markAsTouched();
      expect(email.invalid).toBeTruthy();
      expect(email.errors.required).toBeTruthy();
    });

    it('should validate email address', () => {
      const email = component.formGroup.controls.email;
      email.setValue('not-tinas-email');
      expect(email.invalid).toBeTruthy();
      expect(email.errors.email).toBeTruthy();
    });

    it('should require password', () => {
      const password = component.formGroup.controls.password;
      password.markAsTouched();
      expect(password.invalid).toBeTruthy();
      expect(password.errors.required).toBeTruthy();
    });
  });

  describe('login', () => {
    it('should login and go to home page', async () => {
      const { email, password } = component.formGroup.controls;
      email.setValue(newUser.email);
      password.setValue(newUser.password);

      await component.login();

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(
        newUser.email,
        newUser.password
      );
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });

    it('should log an error if there is a problem logging in', async () => {
      authService.login = jest.fn().mockRejectedValue(undefined);
      console.error = jest.fn();

      const { email, password } = component.formGroup.controls;
      email.setValue(newUser.email);
      password.setValue(newUser.password);

      await component.login();

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(
        newUser.email,
        newUser.password
      );
      expect(router.navigate).toHaveBeenCalledTimes(0);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
