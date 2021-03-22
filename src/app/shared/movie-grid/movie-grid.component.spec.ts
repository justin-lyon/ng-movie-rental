import { MovieView } from './../../models/movie.view';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGridComponent } from './movie-grid.component';

@Component({
  selector: 'app-movie-card',
  template: ''
})
class MockMovieCard {
  @Input()
  movie: MovieView;
}

describe('MovieGridComponent', () => {
  let component: MovieGridComponent;
  let fixture: ComponentFixture<MovieGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieGridComponent, MockMovieCard]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
