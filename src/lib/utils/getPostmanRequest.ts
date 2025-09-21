import { HeaderDefinition, Request } from 'postman-collection';
import { checkBodyAndConvert } from '@/lib/utils/checkBodyAndConvert';

export type UserInput = {
  method: string;
  url: string;
  headers: Array<{ key: string; value: string }>;
  body: string;
};
export const getPostmanRequest = (arg: UserInput) => {
  const { method, url, headers, body } = arg;
  const parsedHeaders: HeaderDefinition[] = headers.map((h) => ({
    key: h.key,
    value: h.value,
  }));

  return new Request({
    method: method,
    url: url,
    header: parsedHeaders,
    body: checkBodyAndConvert(method, body),
  });
};
