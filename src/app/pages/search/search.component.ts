import { toTitleCase } from './../../common/utils/to-title-case';
import { MovieView } from './../../models/movie.view';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MovieService } from './../../services/movie.service';
import { toTitleCase } from './../../common/utils';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: MovieView[];
  title = 'Search';
  _subtitle = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      const { term } = queryParams;
      if (term) {
        return this.fetchSearchMovies(term);
      }
      this.subtitle = ``;
      return;
    });
  }

  fetchSearchMovies(term: string): Promise<void> {
    return this.movieService
      .search(term)
      .then(movies => {
        this.movies = movies;
        this.subtitle = `"${toTitleCase(term)}"`;
      })
      .catch(error => {
        console.error(`error searching movies for ${term}`, error);
      });
  }

  get subtitle(): string {
    return toTitleCase(this._subtitle);
  }
  set subtitle(val: string) {
    this._subtitle = '';
    if (val && val.length) {
      this._subtitle = val.toLowerCase();
    }
  }
}
