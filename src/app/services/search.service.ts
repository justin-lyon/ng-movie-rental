import { MovieView } from './../models/movie.view';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PATH = 'movies';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Promise<MovieView[]> {
    let params = new HttpParams();
    params = params.set('searchTerm', term);

    return this.http
      .get<MovieView[]>(PATH, { params })
      .toPromise();
  }
}
