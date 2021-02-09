import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): Promise<void> {
    if (this.formGroup.invalid) return;

    const { email, password } = this.formGroup.value;
    return this.authService
      .login(email, password)
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.error('Error logging in', error);
        this.formGroup.setErrors({
          invalidUsernameOrPassword: true
        });
      });
  }
}
