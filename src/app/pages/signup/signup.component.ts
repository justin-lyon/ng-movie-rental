import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  confirmPasswordValidator,
  namedValidator
} from '../../common/validators';
import { NewUserModel } from '../../models';
import { AuthService } from './../../services/auth.service';

const lowerPattern = /[a-z]/;
const upperPattern = /[A-Z]/;
const numberPattern = /\d/;
const specialPattern = /\p{P}/u;

const passwordPatterns = [
  namedValidator('lowerPattern', Validators.pattern(lowerPattern)),
  namedValidator('upperPattern', Validators.pattern(upperPattern)),
  namedValidator('numberPattern', Validators.pattern(numberPattern)),
  namedValidator('specialPattern', Validators.pattern(specialPattern))
];

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.minLength(8), ...passwordPatterns]
        ],
        password2: ['', Validators.required]
      },
      { validator: confirmPasswordValidator('password', 'password2') }
    );
  }

  passwordErrorMessage(): string {
    let message = '';

    if (
      !this.signupForm.controls.password.errors ||
      (this.signupForm.controls.password.untouched &&
        this.signupForm.controls.password.valid)
    ) {
      return message;
    }

    const errors = Object.entries(
      this.signupForm.controls.password.errors
    ).map(pair => ({ name: pair[0], value: pair[1] }));

    const errorName = errors[0].name;
    switch (errorName) {
      case 'required':
        message = 'This field is required.';
        break;
      case 'minlength':
        message = `Minimum length of 8 characters. (${this.signupForm.controls.password.value.length})`;
        break;
      case 'lowerPattern':
        message = 'Password must have at least 1 lowercase letter.';
        break;
      case 'upperPattern':
        message = 'Password must have at least 1 uppercase letter.';
        break;
      case 'numberPattern':
        message = 'Password must have at least 1 number.';
        break;
      case 'specialPattern':
        message = 'Password must have at least 1 special character.';
        break;
      default:
        message = '';
    }
    return message;
  }

  submit(): Promise<void> {
    if (this.signupForm.invalid) {
      throw new Error('Cannot submit an invalid form.');
    }

    const { username, email, password } = this.signupForm.value;

    const newUser: NewUserModel = {
      username,
      email,
      password
    };

    return this.authService
      .signup(newUser)
      .then(() => {
        return this.authService.login(newUser.email, newUser.password);
      })
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.error('Unhandled error:', error);
      });
  }
}
