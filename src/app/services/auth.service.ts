import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewUserModel, UserModel } from '../models';

export const SIGNUP_PATH = 'signup';
export const PATH = 'auth/login';
export const TOKEN_STORAGE = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private state = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(private http: HttpClient) {}

  observe(): Observable<boolean> {
    return this.state.asObservable();
  }

  signup(newUser: NewUserModel): Promise<UserModel> {
    return this.http.post<UserModel>(SIGNUP_PATH, newUser).toPromise();
  }

  login(email: string, password: string): Promise<void> {
    // server returns content-type text.
    return this.http
      .post(PATH, { email, password }, { responseType: 'text' })
      .toPromise()
      .then((data: string) => {
        this.setToken(data.split(' ')[1]);
      });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_STORAGE);
    this.state.next(false);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = !!this.getToken();
    this.state.next(isLoggedIn);
    return isLoggedIn;
  }

  getToken(): string {
    const token = localStorage.getItem(TOKEN_STORAGE);
    if (token) return token;
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_STORAGE, token);
    this.state.next(true);
  }
}
