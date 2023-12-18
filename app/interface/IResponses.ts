export interface IResponseHeader {
  code: number;
  status: string;
}

export interface IResponseBody {
  message: string;
  data: unknown;
}

export interface IResponses {
  header: IResponseHeader;
  body: IResponseBody;
}
