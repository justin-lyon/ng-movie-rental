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

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchMovie();
  }

  buildBackdropUrl(): void {
    console.log('get backdrop url');
    const width = 1280;
    this.backdropUrl = `url(http://image.tmdb.org/t/p/w${width}${this.movie.backdropPath})`;
  }

  buildPosterUrl(): void {
    const width = 185;
    this.posterUrl = `url(http://image.tmdb.org/t/p/w${width}${this.movie.posterPath})`;
  }

  fetchMovie(): Promise<MovieDetailView> {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    return this.movieService
      .getOneById(movieId)
      .then((movie: MovieDetailView) => {
        this.movie = movie;
        this.genres = movie.genres.map(g => g.name);
        this.spokenLanguages = movie.spokenLanguages.map(l => l.name);
        console.log('movie found', movie);
        this.buildBackdropUrl();
        this.buildPosterUrl();
        return movie;
      })
      .catch(error => {
        console.error(`Cannot find movie by Id: ${movieId}`, error.message);
        return null;
      });
  }
}
