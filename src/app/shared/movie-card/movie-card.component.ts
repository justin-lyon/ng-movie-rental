import { getImgUrl } from './../../common/utils';
import { MovieView } from './../../models/movie.view';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input()
  movie: MovieView;

  constructor() {}

  ngOnInit(): void {}

  get backdropImg(): string {
    return `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${getImgUrl(this.movie.backdropPath, 300)})`;
  }
}
