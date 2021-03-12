import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate;
  }

  get backdropImg(): string {
    return `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${getImgUrl(this.movie.backdropPath, 300)})`;
  }

  goToDetail(): void {
    alert('TODO - Implement Movie Detail Router Link Here');
  }
}
