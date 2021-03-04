import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesGridComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
