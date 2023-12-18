export interface ICapturedAyah {
  i: number;
  s: string;
  e: string;
}

export interface ICapturedSurah {
  i: number;
  time: ICapturedAyah[];
}
