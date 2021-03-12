import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { MovieView } from './../../models/movie.view';
import { SearchService } from './../../services/search.service';
import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent {
  @Input()
  title: string;
  @Input()
  subtitle: string;
}

@Component({
  selector: 'app-movie-grid',
  template: ''
})
class MockMovieGrid {
  @Input()
  movies: MovieView[];
}

const term = 'the goonies';
const MockActivatedRoute = {
  provide: ActivatedRoute,
  useValue: {
    queryParams: of({ term })
  }
};

// jest.mock('@angular/router');
jest.mock('./../../services/search.service');
describe('SearchComponent', () => {
  let route: ActivatedRoute;
  let searchService: SearchService;

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, MockHeaderComponent, MockMovieGrid],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [SearchService, MockActivatedRoute]
    }).compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    searchService = TestBed.inject(SearchService);

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
