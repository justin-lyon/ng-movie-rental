import { NewUserModel, UserModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const SIGNUP_PATH = 'signup';
export const PATH = 'auth/login';
export const TOKEN_STORAGE = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(newUser: NewUserModel): Promise<UserModel> {
    return this.http.post<UserModel>(SIGNUP_PATH, newUser).toPromise();
  }

  login(email: string, password: string): Promise<string> {
    // server returns content-type text.
    return this.http
      .post(PATH, { email, password }, { responseType: 'text' })
      .toPromise()
      .then((token: string) => {
        localStorage.setItem(TOKEN_STORAGE, token.split(' ')[1]);
        return token;
      });
  }

  getToken(): string {
    const token = localStorage.getItem(TOKEN_STORAGE);
    if (token) return token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
