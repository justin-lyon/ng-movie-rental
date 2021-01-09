import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  ConfirmPasswordValidator,
  NamedPatternValidator
} from 'src/app/common/validators';

const lowerPattern = /[a-z]/;
const upperPattern = /[A-Z]/;
const numberPattern = /\d/;
const specialPattern = /\p{P}/u;

const passwordPatterns = [
  NamedPatternValidator('lowerPattern', Validators.pattern(lowerPattern)),
  NamedPatternValidator('upperPattern', Validators.pattern(upperPattern)),
  NamedPatternValidator('numberPattern', Validators.pattern(numberPattern)),
  NamedPatternValidator('specialPattern', Validators.pattern(specialPattern))
];

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  passwordErrorMessage(): string {
    let message = '';
    if (
      this.signupForm.pristine ||
      (this.signupForm.touched && this.signupForm.valid)
    ) {
      return message;
    }
    const errors = Object.entries(
      this.signupForm.controls.password1.errors
    ).map(item => ({ name: item[0], value: item[1] }));

    const errorName = errors[0].name;
    switch (errorName) {
      case 'required':
        message = 'This field is required.';
        break;
      case 'minlength':
        message = `Minimum length of 8 characters. (${this.signupForm.controls.password1.value.length})`;
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.minLength(2), Validators.maxLength(20)]],
        email: ['', [Validators.email]],
        password1: ['', [Validators.minLength(8), ...passwordPatterns]],
        password2: ['']
      },
      { validator: ConfirmPasswordValidator('password1', 'password2') }
    );
  }
}
