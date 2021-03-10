import { MovieService } from '../../services/movie.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MovieView } from '../../models';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchInput = new FormControl('');
  movies: MovieView[];
  title = 'Popular';
  subtitle = 'Recently trending movies';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService
      .getPopularMovies()
      .then(movies => {
        this.movies = movies;
        console.log('popular', movies);
      })
      .catch(error => {
        console.error('error getting popular movies.', error);
      });
  }

  onClickSearch(): void {
    const term = this.searchInput.value;
    const isBreak = !term || term.length < 3;
    if (isBreak) return;

    this.movieService
      .search(this.searchInput.value)
      .then(movies => {
        this.movies = movies;
        console.log('movies', movies);
      })
      .catch(error => {
        console.error('error searching movies', error);
      });
  }
}
