import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailComponent } from './movie-detail.component';

const routes: Routes = [{ path: '', component: MovieDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieDetailRoutingModule {}
