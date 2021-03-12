import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGridComponent } from './movie-grid.component';

describe('MovieGridComponent', () => {
  let component: MovieGridComponent;
  let fixture: ComponentFixture<MovieGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieGridComponent]
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
