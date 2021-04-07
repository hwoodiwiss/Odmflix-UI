export interface Show {
  Id: number;
  ShowTypeId: number;
  ShowType: string;
  Title: string;
  DateAdded: string;
  ReleaseYearId: number;
  ReleaseYear: number;
  RatingId: number;
  Rating: string;
  Duration: number;
  Description: string;
}

export interface TvShow {
  Id: number;
  Title: string;
  DateAdded: string;
  ReleaseYearId: number;
  ReleaseYear: number;
  RatingId: number;
  Rating: string;
  Duration: number;
  Description: string;
}

export interface Movies {
  Id: number;
  Title: string;
  DateAdded: string;
  ReleaseYearId: number;
  ReleaseYear: number;
  RatingId: number;
  Rating: string;
  Duration: number;
  Description: string;
}
