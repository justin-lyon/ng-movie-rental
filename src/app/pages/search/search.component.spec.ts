import { MovieService } from './../../services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { MockMovieGrid } from './../../../mock/shared/mock-movie-grid.component';
import { MockHeaderComponent } from './../../../mock/shared/mock-header.component';

import { SearchComponent } from './search.component';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let term: string;
const MockActivatedRoute = {
  provide: ActivatedRoute,
  useValue: {
    queryParams: Observable.create(obs => {
      obs.next({ term });
    })
  }
};

const mockMovies = [{ title: 'The Goonies', id: 1337 }];

jest.mock('./../../services/search.service');
describe('SearchComponent', () => {
  let route: ActivatedRoute;
  let movieService: MovieService;

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, MockHeaderComponent, MockMovieGrid],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [MovieService, MockActivatedRoute]
    }).compileComponents();
  });

  beforeEach(() => {
    term = 'THE GOONIES';
    route = TestBed.inject(ActivatedRoute);
    movieService = TestBed.inject(MovieService);

    movieService.search = jest.fn().mockResolvedValue(mockMovies);

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.fetchSearchMovies = jest.fn();
    });

    it('should invoke fetchSearchMovies with term', () => {
      component.ngOnInit();
      expect(component.fetchSearchMovies).toHaveBeenCalledTimes(1);
      expect(component.fetchSearchMovies).toHaveBeenCalledWith(term);
    });

    it('should not invoke fetchSearchMovies when term is falsy', () => {
      term = null;
      component.ngOnInit();
      expect(component.fetchSearchMovies).toHaveBeenCalledTimes(0);
    });
  });

  describe('fetchSearchMovies', () => {
    beforeEach(() => {
      movieService.search = jest.fn().mockResolvedValue(mockMovies);
    });

    it('should invoke movie service with term', async () => {
      await component.fetchSearchMovies(term);

      expect(movieService.search).toHaveBeenCalledTimes(1);
      expect(movieService.search).toHaveBeenCalledWith(term);

      expect(component.movies).toBe(mockMovies);
      expect(component._subtitle).toBe(term.toLowerCase());
    });

    it('should log an error when it fails', async () => {
      console.error = jest.fn();
      movieService.search = jest
        .fn()
        .mockRejectedValue({ message: 'Forced Error' });

      await component.fetchSearchMovies('');

      expect(movieService.search).toHaveBeenCalledTimes(1);
      expect(movieService.search).toHaveBeenCalledWith('');

      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('_subtitle', () => {
    it('should set subtitle with lowercase', () => {
      const value = 'ALL CAPS';
      component.subtitle = value;
      expect(component._subtitle).toBe(value.toLowerCase());
    });

    it('should set subtitle to empty if value is falsy', () => {
      const value = null;
      component.subtitle = value;
      expect(component._subtitle).toBe('');
    });

    it('should get subtitle as title case', () => {
      component._subtitle = 'THE GOONIES';
      expect(component.subtitle).toBe('The Goonies');
    });
  });
});
