import { MovieDetailView } from './../../models/movie-detail.view';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from './../../../mock/ng/activated-route.mock';
import { MovieService } from './../../services/movie.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';

jest.mock('../../services/movie.service');
describe('MovieDetailComponent', () => {
  let movieService: MovieService;
  let activatedRoute: ActivatedRoute;
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [MovieService, MockActivatedRoute]
    }).compileComponents();
  });

  beforeEach(() => {
    movieService = TestBed.inject(MovieService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    movieService.getOneById = jest
      .fn()
      .mockResolvedValue(new MovieDetailView());

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
