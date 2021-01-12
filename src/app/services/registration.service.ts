import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NewUserModel, UserModel } from '../models';
import { print } from '../common/utils';

const PATH = '/signup';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  signup(newUser: NewUserModel): Observable<any> {
    return this.http.get(PATH).pipe(
      tap(val => print('signup', val)),
      catchError(this.handleError<UserModel>('signup'))
    );
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
    this.messageService.add(`HeroService: ${message}`);
  }
}
