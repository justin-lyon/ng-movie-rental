import { LanguageView } from './language.view';
import { ProductionCountryView } from './production-country.view';
import { ProductionCompanyView } from './production-company.view';
import { CollectionView } from './collection.view';
import { GenreView } from './genre.view';

export class MovieDetailView {
  id: number;
  title: string;
  isAdult: boolean;
  backdropPath: string;
  belongsToCollection: CollectionView;
  budget: number;
  genres: GenreView[];
  homepage: string;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: ProductionCompanyView[];
  productionCountries: ProductionCountryView[];
  releaseDate: Date;
  revenue: number;
  runtime: number;
  spokenLanguages: LanguageView[];
  status: string;
  tagline: string;
  isVideo: boolean;
  voteAverage: number;
  voteCount: number;
}
