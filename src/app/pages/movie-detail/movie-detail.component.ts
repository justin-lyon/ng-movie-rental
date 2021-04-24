import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieView } from '../../models';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: MovieView;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchMovie();
  }

  fetchMovie(): Promise<MovieView> {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    return this.movieService
      .getOneById(movieId)
      .then((movie: MovieView) => {
        this.movie = movie;
        console.log('movie found', movie);
        return movie;
      })
      .catch(error => {
        console.error(`Cannot find movie by Id: ${movieId}`, error.message);
        return null;
      });
  }
}
