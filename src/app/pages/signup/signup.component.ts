import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/common/validators/confirm-password.validator';

const lowerPattern = /[a-z]{1,}/;
const upperPattern = /[A-Z]{1,}/;
const numberPattern = /\d{1,}/;
const specialPattern = /#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{1,}/;

const passwordPatterns = [
  Validators.pattern(lowerPattern),
  Validators.pattern(upperPattern),
  Validators.pattern(numberPattern)
  // Validators.pattern(specialPattern)
];

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

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
        password2: ['', [Validators.minLength(8), ...passwordPatterns]]
      },
      { validator: ConfirmPasswordValidator('password1', 'password2') }
    );
  }
}
