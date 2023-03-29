export interface IRecitationSuraa {
  id: number;
  schema: IRecitationSuraSchema[]
}

interface IRecitationSuraSchema {
  i: number;
  s: string;
  e: string;
}