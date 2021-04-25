export interface Type {
  Id: number;
  Name: string;
}

export interface ByType<T> {
  [Type: string]: T[];
}

export interface TypeCount {
  Type: string;
  Count: number;
}
