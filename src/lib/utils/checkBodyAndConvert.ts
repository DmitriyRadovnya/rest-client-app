import { RequestBody } from 'postman-collection';

export const checkBodyAndConvert = (
  method: string,
  body: string
): RequestBody | undefined => {
  if (method === 'GET' || body.trim() === '') return undefined;
  return new RequestBody({ mode: 'raw', raw: JSON.stringify(body) });
};
