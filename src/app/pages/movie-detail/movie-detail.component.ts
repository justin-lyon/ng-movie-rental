import { MovieDetailView } from '../../models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDetailView | null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchMovie();
  }

  get backdropImg(): string {
    console.log('get backdrop url');
    const width = 'original';
    return `url(http://image.tmdb.org/t/p/${width}${this.movie.backdropPath})`;
  }

  fetchMovie(): Promise<MovieDetailView> {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    return this.movieService
      .getOneById(movieId)
      .then((movie: MovieDetailView) => {
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
