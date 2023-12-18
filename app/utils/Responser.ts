import { IResponseBody, IResponseHeader, IResponses } from '@/interface';

export const Responser = (responseHeader: IResponseHeader, responseBody: IResponseBody): IResponses => ({
  header: {
    code: responseHeader.code,
    status: responseHeader.status,
  },
  body: {
    message: responseBody.message,
    data: responseBody.data,
  },
});
