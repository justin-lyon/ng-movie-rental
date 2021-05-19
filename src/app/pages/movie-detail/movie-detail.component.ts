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
  genres: string[];
  spokenLanguages: string[];
  backdropUrl: string;
  posterUrl: string;
  imdbUrl: string;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.init();
  }

  buildBackdropUrl(): void {
    const width = 1280;
    this.backdropUrl = `url(http://image.tmdb.org/t/p/w${width}${this.movie.backdropPath})`;
  }

  buildPosterUrl(): void {
    const width = 185;
    this.posterUrl = `url(http://image.tmdb.org/t/p/w${width}${this.movie.posterPath})`;
  }

  buildImdbUrl(): void {
    this.imdbUrl = `https://www.imdb.com/title/${this.movie.imdbId}`;
  }

  init(): Promise<void> {
    return this.fetchMovie()
      .then(movie => {
        this.genres = movie.genres.map(g => g.name);
        this.spokenLanguages = movie.spokenLanguages.map(l => l.name);
        this.buildBackdropUrl();
        this.buildPosterUrl();
        this.buildImdbUrl();
      })
      .catch(error => {
        console.error('error during initialization', error);
      });
  }

  fetchMovie(): Promise<MovieDetailView> {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    return this.movieService
      .getOneById(movieId)
      .then((movie: MovieDetailView) => {
        this.movie = movie;
        return movie;
      })
      .catch(error => {
        console.error(`Cannot find movie by Id: ${movieId}`, error.message);
        return error;
      });
  }
}
