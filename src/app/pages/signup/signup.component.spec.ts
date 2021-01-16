import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { SignupComponent } from './signup.component';
import { AuthService } from './../../services/auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

jest.mock('@angular/router');
jest.mock('./../../services/auth.service');
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let loader: HarnessLoader;
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
      providers: [Router, AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(SignupComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create a formgroup with inputs', () => {
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
  });

  describe('passwordErrorMessage', () => {
    beforeEach(() => {
      component.initForm();
    });

    it('should validate passwords are required', () => {
      const controls = component.signupForm.controls;
      controls.password.setValue('');
      controls.password.updateValueAndValidity();
      component.signupForm.pristine = jest.fn().mockReturnValue(true);
      const message = component.passwordErrorMessage();
      expect(message).toBe('This field is required.');
    });

    it('should validate min length 8', () => {});

    it('should validate min 1 lower case letter', () => {});

    it('should validate min 1 uppercase letter', () => {});

    it('should validate min 1 number', () => {});

    it('should validate min 1 special character', () => {});
  });
});
