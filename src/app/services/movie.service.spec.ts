import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MovieService, PATH } from './movie.service';

jest.mock('@angular/common/http');
describe('MovieService', () => {
  let http: HttpClient;
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient] });

    http = TestBed.inject(HttpClient);
    http.get = jest.fn().mockReturnValue(of([]));

    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('search', () => {
    it('should GET with params and return a promise', async () => {
      const term = 'goonies';
      let params = new HttpParams();
      params = params.set('searchTerm', term);

      const movies = await service.search(term);
      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(PATH, { params });
      expect(movies).toStrictEqual([]);
    });
  });

  describe('getPopularMovies', () => {
    it('should GET and return a promise', async () => {
      const movies = await service.getPopularMovies();
      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(PATH);
      expect(movies).toStrictEqual([]);
    });
  });
});
