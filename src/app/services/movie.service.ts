import { MovieDetailView, MovieView } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const PATH = 'movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  search(term: string): Promise<MovieView[]> {
    let params = new HttpParams();
    params = params.set('searchTerm', term);

    return this.http
      .get<MovieView[]>(PATH, { params })
      .toPromise();
  }

  getPopularMovies(): Promise<MovieView[]> {
    return this.http.get<MovieView[]>(PATH).toPromise();
  }

  getOneById(movieId: number): Promise<MovieDetailView> {
    return this.http.get<MovieDetailView>(`${PATH}/${movieId}`).toPromise();
  }
}
