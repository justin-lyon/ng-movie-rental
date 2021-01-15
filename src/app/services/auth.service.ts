import { Router } from '@angular/router';
import { NewUserModel, UserModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { print } from '../common/utils';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

const SIGNUP_PATH = 'signup';
const PATH = 'auth/login';
const TOKEN_STORAGE = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  signup(newUser: NewUserModel): Observable<any> {
    return this.http.post(SIGNUP_PATH, newUser).pipe(
      tap(val => print('signup', val)),
      catchError(this.handleError<UserModel>('signup'))
    );
  }

  login({ email, password }): Observable<any> {
    return this.http.post(PATH, { email, password }).pipe(
      tap((token: string) => {
        console.log('tapping that token', token);
        localStorage.set(TOKEN_STORAGE, token.split(' ')[1]);
      }),
      catchError(this.handleError('login'))
    );
  }

  getToken(): string {
    const token = localStorage.getItem(TOKEN_STORAGE);
    if (token) return token;

    this.router.navigate(['login']);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`auth.service`, message);
    // this.messageService.add(`HeroService: ${message}`);
  }
}
