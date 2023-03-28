export interface IRecitationMap {
  recitator: string;
  directory: string;
  suraa:IRecitationSuraa[]
}

interface IRecitationSuraa {
  id: number;
  schema: IRecitationSuraSchema[]
}

interface IRecitationSuraSchema {
  i: number;
  s: string;
  e: string;
}