export interface RatingCount {
  Rating: string;
  Count: number;
}

export interface ByRating<T> {
  [Rating: string]: T[];
}
