import { MovieView } from './movie.view';

export class CollectionView {
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  parts: MovieView[];
}
