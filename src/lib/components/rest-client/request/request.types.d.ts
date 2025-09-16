import { MethodType } from '@/lib/static/http/methods.types';
import { CodeLangType } from '@/lib/static/codeGen/codeGen.types';

declare interface UserRequest {
  method: MethodType;
  url: string;
  headers: HeaderRow[];
  body: string;
  bodyMode: 'json' | 'text';
  codeLang: CodeLangType;
  snippet: string;
}
