import { Component, OnInit, Input } from '@angular/core';

import { MovieView } from './../../models/movie.view';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {
  @Input()
  movies: MovieView[];

  constructor() {}

  ngOnInit(): void {}
}
