import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { MovieView } from '../../models';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: MovieView[];
  title = 'Popular';
  subtitle = 'Recently trending movies';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    return this.fetchPopularMovies();
  }

  fetchPopularMovies(): Promise<void> {
    return this.movieService
      .getPopularMovies()
      .then(movies => {
        this.movies = movies;
      })
      .catch(error => {
        console.error('error getting popular movies.', error);
      });
  }
}
