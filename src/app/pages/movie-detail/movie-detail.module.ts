import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailRoutingModule } from './movie-detail-routing.module';
import { MovieDetailComponent } from './movie-detail.component';

@NgModule({
  declarations: [MovieDetailComponent],
  imports: [CommonModule, MovieDetailRoutingModule, SharedModule]
})
export class MovieDetailModule {}
