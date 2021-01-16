import { Router } from '@angular/router';
import { NewUserModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const SIGNUP_PATH = 'signup';
const PATH = 'auth/login';
const TOKEN_STORAGE = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(newUser: NewUserModel): Observable<any> {
    return this.http.post(SIGNUP_PATH, newUser);
  }

  login(email: string, password: string): Observable<any> {
    // Spring Boot returns content-type text.
    return this.http
      .post(PATH, { email, password }, { responseType: 'text' })
      .pipe(
        tap((token: string) => {
          localStorage.setItem(TOKEN_STORAGE, token.split(' ')[1]);
        })
      );
  }

  getToken(): string {
    const token = localStorage.getItem(TOKEN_STORAGE);
    if (token) return token;

    this.router.navigate(['login']);
  }
}
