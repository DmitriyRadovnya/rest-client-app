import { MethodType } from '@/lib/static/http/methods.types';

declare interface UserRequest {
  method: MethodType;
  url: string;
  headers: HeaderRow[];
  body: string;
  bodyMode: 'json' | 'text';
  codeVariant: CodeGenVariant;
  snippet: string;
}
