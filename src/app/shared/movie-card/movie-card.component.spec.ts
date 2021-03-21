import { MovieView } from './../../models/movie.view';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';

const MockRouter = {
  provide: Router,
  useValue: {
    navigate: jest.fn().mockResolvedValue(true)
  }
};

const mockMovie: MovieView = {
  backdropPath: 'placeholder',
  title: 'the goonies',
  id: 1,
  originalTitle: 'the goonies',
  originalLanguage: 'english',
  posterPath: 'placeholder',
  overview: 'greatest movie of all time. fite me',
  releaseDate: new Date(),
  genreIds: [1],
  voteCount: 9001,
  popularity: 9001,
  voteAverage: 1337
};

jest.mock('./../../common/utils', () => ({
  ...jest.requireActual('./../../common/utils'),
  getImgUrl: jest.fn().mockReturnValue('path')
}));

describe('MovieCardComponent', () => {
  let router: Router;

  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      providers: [MockRouter]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    window.alert = jest.fn();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;

    component.movie = mockMovie;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('TODO', () => {
      // TODO
      expect(true).toBe(true);
    });
  });

  describe('get backdropImg', () => {
    it('should return a background-img style string', () => {
      const path = 'path';
      const result = component.backdropImg;

      expect(result).toContain(`url(${path})`);
    });
  });

  describe('goToDetail', () => {
    it('should alert', () => {
      component.goToDetail();
      expect(alert).toHaveBeenCalledTimes(1);
    });
  });
});
