import { NewUserModel, UserModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

export const SIGNUP_PATH = 'signup';
export const PATH = 'auth/login';
export const TOKEN_STORAGE = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private state = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  observe(): Observable<boolean> {
    return this.state.asObservable();
  }

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
        this.state.next(true);
        return token;
      });
  }

  getToken(): string {
    const token = localStorage.getItem(TOKEN_STORAGE);
    if (token) return token;
  }

  isLoggedIn(): boolean {
    const isLoggedIn = !!this.getToken();
    this.state.next(isLoggedIn);
    return isLoggedIn;
  }
}
