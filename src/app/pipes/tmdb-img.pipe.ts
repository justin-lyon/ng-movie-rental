import { getImgUrl } from './../common/utils';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tmdbImg'
})
export class TmdbImgPipe implements PipeTransform {
  transform(value: string, width = 300): unknown {
    return getImgUrl(value, width);
  }
}
