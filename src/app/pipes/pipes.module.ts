import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbImgPipe } from './tmdb-img.pipe';

@NgModule({
  declarations: [TmdbImgPipe],
  imports: [CommonModule],
  exports: [TmdbImgPipe]
})
export class PipesModule {}
