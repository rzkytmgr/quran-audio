export class ErrorResponseHandler extends Error {
  public code: number;
  public name: string;
  public message: string;

  constructor (code: number, message: string, name?: string) {
    super();
    this.code = code;
    this.name = name;
    this.message = message + '. Read the following docs here https://github.com/rzkytmgr/quran-recitation-cutter';
  }
}