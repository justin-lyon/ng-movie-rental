import { GenreView, LanguageView } from './../../models';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from './../../../mock/ng/activated-route.mock';
import { MovieService } from './../../services/movie.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { MovieDetailComponent } from './movie-detail.component';

const genres: GenreView[] = [
  {
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Comedy'
  }
];

const spokenLanguages: LanguageView[] = [
  {
    languageCode: 'en',
    name: 'English'
  },
  {
    languageCode: 'ja',
    name: '日本語'
  },
  {
    languageCode: 'zh',
    name: '普通话'
  }
];

const movie = {
  title: 'Tropic Thunder',
  genres,
  spokenLanguages,
  backdropPath: '/fake-backdrop.jpg',
  posterPath: '/fake-poster.jpg',
  imdbId: 'imdb-id-1'
};

jest.mock('../../services/movie.service');
describe('MovieDetailComponent', () => {
  let movieService: MovieService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  let activatedRoute: ActivatedRoute;
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      imports: [MatChipsModule, MatProgressSpinnerModule, MatIconModule],
      providers: [MovieService, ActivatedRouteMock]
    }).compileComponents();
  });

  beforeEach(() => {
    movieService = TestBed.inject(MovieService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    movieService.getOneById = jest.fn().mockResolvedValue(movie);

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init', () => {
    beforeEach(() => {
      jest.spyOn(component, 'fetchMovie');
      component.movie = null;
      component.genres = null;
      component.spokenLanguages = null;
      component.backdropUrl = null;
      component.posterUrl = null;
      component.imdbUrl = null;
    });

    it('should invoke this.init from ngOnInit', () => {
      component.init = jest.fn();
      component.ngOnInit();
      expect(component.init).toHaveBeenCalledTimes(1);
    });

    it('should set genres', async () => {
      await component.init();
      expect(component.fetchMovie).toHaveBeenCalledTimes(1);
      expect(component.genres).toStrictEqual(genres.map(g => g.name));
    });

    it('should set spokenLanguages', async () => {
      await component.init();
      expect(component.fetchMovie).toHaveBeenCalledTimes(1);

      expect(component.spokenLanguages).toStrictEqual(
        spokenLanguages.map(l => l.name)
      );
    });

    it('should set backdropUrl', async () => {
      await component.init();
      expect(component.fetchMovie).toHaveBeenCalledTimes(1);

      const expectedUrl = `url(http://image.tmdb.org/t/p/w1280${movie.backdropPath})`;
      expect(component.backdropUrl).toBe(expectedUrl);
    });

    it('should set posterUrl', async () => {
      await component.init();
      expect(component.fetchMovie).toHaveBeenCalledTimes(1);

      const expectedUrl = `url(http://image.tmdb.org/t/p/w185${movie.posterPath})`;
      expect(component.posterUrl).toBe(expectedUrl);
    });

    it('should set imdbUrl', async () => {
      await component.init();
      expect(component.fetchMovie).toHaveBeenCalledTimes(1);

      const expectedUrl = `https://www.imdb.com/title/${movie.imdbId}`;
      expect(component.imdbUrl).toBe(expectedUrl);
    });
  });
});
