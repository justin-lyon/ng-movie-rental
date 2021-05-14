import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockMovieGrid } from './../../../mock/shared/mock-movie-grid.component';
import { HeaderComponentMock } from '../../../mock/shared/header.component.mock';

import { MovieService } from './../../services/movie.service';
import { HomeComponent } from './home.component';

jest.mock('./../../services/movie.service');
describe('HomeComponent', () => {
  let movieService: MovieService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponentMock, MockMovieGrid],
      providers: [MovieService]
    }).compileComponents();
  });

  beforeEach(() => {
    movieService = TestBed.inject(MovieService);
    movieService.getPopularMovies = jest.fn().mockResolvedValue([]);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Reset mock after component loaded.
    movieService.getPopularMovies = jest.fn().mockResolvedValue([]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should invoke fetchPopularMovies', () => {
      component.fetchPopularMovies = jest.fn();
      component.ngOnInit();
      expect(component.fetchPopularMovies).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchPopularMovies', () => {
    it('should set movies with result', async () => {
      component.movies = null;
      await component.fetchPopularMovies();
      expect(movieService.getPopularMovies).toHaveBeenCalledTimes(1);
      expect(component.movies).toStrictEqual([]);
    });

    it('should console.error with error', async () => {
      movieService.getPopularMovies = jest.fn().mockRejectedValue(null);
      console.error = jest.fn();
      component.movies = null;
      await component.fetchPopularMovies();
      expect(movieService.getPopularMovies).toHaveBeenCalledTimes(1);
      expect(component.movies).toBeNull();
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
