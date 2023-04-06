export class ResponseHandler {
  public code: number;
  public message: string;
  public data: Array<any> | object | null;

  constructor (code: number, message: string, data: Array<any> | object | null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}