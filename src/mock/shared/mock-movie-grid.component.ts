import { Component, Input } from '@angular/core';
import { MovieView } from '../../app/models/movie.view';

@Component({
  selector: 'app-movie-grid',
  template: ''
})
export class MockMovieGrid {
  @Input()
  movies: MovieView[];
}
