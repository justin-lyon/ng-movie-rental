import { ActivatedRoute, Data, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { MovieView } from '../../models';
import { toTitleCase } from './../../common/utils';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchInput = new FormControl('');
  movies: MovieView[];
  title = 'Popular';
  subtitle = 'Recently trending movies';

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
      return this.fetchPopularMovies();
    });
  }

  fetchPopularMovies(): Promise<void> {
    return this.movieService
      .getPopularMovies()
      .then(movies => {
        this.movies = movies;
        this.title = 'Popular';
        this.subtitle = 'Recently trending movies';
      })
      .catch(error => {
        console.error('error getting popular movies.', error);
      });
  }

  fetchSearchMovies(term: string): Promise<void> {
    return this.movieService
      .search(term)
      .then(movies => {
        this.movies = movies;
        this.title = 'Search';
        this.subtitle = `"${toTitleCase(term)}"`;
      })
      .catch(error => {
        console.error(`error searching movies for ${term}`, error);
      });
  }
}
