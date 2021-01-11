import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUserModel, UserModel } from '../models';

const PATH = '/signup';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  signup(newUser: NewUserModel): Observable<any> {
    return this.http.get(PATH);
  }
}
