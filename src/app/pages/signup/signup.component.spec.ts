import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { SignupComponent } from './signup.component';
import { AuthService } from './../../services/auth.service';
import { NewUserModel, UserModel } from './../../models';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterMock } from '../../../mock/ng/router.mock';

const MOCK_USER_ID = 'new-user-id';
const newUser: NewUserModel = {
  username: 'i-smell-fear-on-you',
  email: 'belcher.louise@hotmail.com',
  password: 'kuchiK0pi!'
};
const savedUser: UserModel = {
  id: MOCK_USER_ID,
  username: newUser.username,
  email: newUser.email
};
const MOCK_LOGIN_RESPONSE = `${newUser.username} i.ama.jwt`;

jest.mock('./../../services/auth.service');
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [RouterMock, AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);

    router.navigate = jest.fn().mockResolvedValue(true);
    authService.signup = jest.fn().mockResolvedValue(savedUser);
    authService.login = jest.fn().mockResolvedValue(of(MOCK_LOGIN_RESPONSE));

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.initForm();
    });

    it('should create a formgroup with controls', () => {
      component.ngOnInit();
      expect(component.signupForm).toBeDefined();
      const {
        username,
        email,
        password,
        password2
      } = component.signupForm.value;
      expect(username).toBeDefined();
      expect(email).toBeDefined();
      expect(password).toBeDefined();
      expect(password2).toBeDefined();
    });

    it('should require username.', () => {
      const username = component.signupForm.controls.username;
      username.markAsTouched();
      expect(username.invalid).toBeTruthy();
      expect(username.errors.required).toBeTruthy();
    });

    it('should require minlength 2, username', () => {
      const username = component.signupForm.controls.username;
      username.markAsTouched();
      const tooshort = '1';
      username.setValue(tooshort);
      expect(username.invalid).toBeTruthy();
      expect(username.errors.minlength).toBeTruthy();
    });

    it('should require maxlength 20, username', () => {
      const username = component.signupForm.controls.username;
      username.markAsTouched();
      username.setValue('this-value-is-waaaaaaaaaaaaaaaaaaaaaaaaaay-too-long');
      expect(username.invalid).toBeTruthy();
      expect(username.errors.maxlength).toBeTruthy();
    });

    it('should require email.', () => {
      const email = component.signupForm.controls.email;
      email.markAsTouched();
      expect(email.invalid).toBeTruthy();
      expect(email.errors.required).toBeTruthy();
    });

    it('should require a valid email', () => {
      const email = component.signupForm.controls.email;
      email.markAsTouched();
      email.setValue('invalid-email-address');
      expect(email.invalid).toBeTruthy();
      expect(email.errors.email).toBeTruthy();
    });

    it('should require password2', () => {
      const password2 = component.signupForm.controls.password2;
      password2.markAsTouched();
      expect(password2.invalid).toBeTruthy();
      expect(password2.errors.required).toBeTruthy();
    });

    it('should require password and password2 to match', () => {
      component.signupForm.controls.password.setValue('Abc1234!');
      const password2 = component.signupForm.controls.password2;
      password2.markAsTouched();
      password2.setValue('abc12345');
      expect(password2.invalid).toBeTruthy();
      expect(password2.errors.confirmPasswordValidator).toBeTruthy();
    });
  });

  describe('passwordErrorMessage', () => {
    beforeEach(() => {
      component.initForm();
    });

    it('should validate passwords are required', () => {
      const password = component.signupForm.controls.password;
      password.markAsTouched();
      expect(password.invalid).toBeTruthy();
      expect(password.errors.required).toBeTruthy();

      const message = component.passwordErrorMessage();
      expect(message).toBe('This field is required.');
    });

    it('should validate min length 8', () => {
      const password = component.signupForm.controls.password;
      password.markAsTouched();
      password.setValue('A');
      expect(password.invalid).toBeTruthy();
      expect(password.errors.minlength).toBeTruthy();

      const message = component.passwordErrorMessage();
      expect(message).toBe('Minimum length of 8 characters. (1)');
    });

    it('should validate min 1 lower case letter', () => {
      const password = component.signupForm.controls.password;
      password.markAsTouched();
      password.setValue('ABCD1234');
      expect(password.invalid).toBeTruthy();
      expect(password.errors.lowerPattern).toBeTruthy();

      const message = component.passwordErrorMessage();
      expect(message).toBe('Password must have at least 1 lowercase letter.');
    });

    it('should validate min 1 uppercase letter', () => {
      const password = component.signupForm.controls.password;
      password.markAsTouched();
      password.setValue('abcd1234');
      expect(password.invalid).toBeTruthy();
      expect(password.errors.upperPattern).toBeTruthy();

      const message = component.passwordErrorMessage();
      expect(message).toBe('Password must have at least 1 uppercase letter.');
    });

    it('should validate min 1 number', () => {
      const password = component.signupForm.controls.password;
      password.markAsTouched();
      password.setValue('Abcdefgh');
      expect(password.invalid).toBeTruthy();
      expect(password.errors.numberPattern).toBeTruthy();

      const message = component.passwordErrorMessage();
      expect(message).toBe('Password must have at least 1 number.');
    });

    it('should validate min 1 special character', () => {
      const password = component.signupForm.controls.password;
      password.markAsTouched();
      password.setValue('Abcd1234');
      expect(password.invalid).toBeTruthy();
      expect(password.errors.specialPattern).toBeTruthy();

      const message = component.passwordErrorMessage();
      expect(message).toBe('Password must have at least 1 special character.');
    });
  });

  describe('submit', () => {
    it('should create new user and log them in.', async () => {
      component.signupForm.controls.username.setValue(newUser.username);
      component.signupForm.controls.email.setValue(newUser.email);
      component.signupForm.controls.password.setValue(newUser.password);
      component.signupForm.controls.password2.setValue(newUser.password);

      await component.submit();

      expect(authService.signup).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.signup).toHaveBeenCalledWith(newUser);
      expect(authService.login).toHaveBeenCalledWith(
        newUser.email,
        newUser.password
      );
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });

    it('should log an error if signup fails.', async () => {
      authService.signup = jest
        .fn()
        .mockRejectedValueOnce(new Error('mock error message'));
      console.error = jest.fn();

      component.signupForm.controls.username.setValue(newUser.username);
      component.signupForm.controls.email.setValue(newUser.email);
      component.signupForm.controls.password.setValue(newUser.password);
      component.signupForm.controls.password2.setValue(newUser.password);

      await component.submit();

      expect(authService.signup).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledTimes(0);
      expect(router.navigate).toHaveBeenCalledTimes(0);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
