export class NewUserModel {
  id: number;
  title: string;
  originalTitle: string;
  originalLanguage: string;
  posterPath: string;
  overview: string;
  releaseDate: Date;
  backdropPath: string;
  genreIds: number[];
  voteCount: number;
  popularity: number;
  voteAverage: number;
}
