declare module 'postman-code-generators' {
  import type { Request } from 'postman-collection';

  export type CodegenLanguage = {
    key: string;
    label?: string;
    variants?: Array<{ key: string; label?: string }>;
    variant?: Array<{ key: string; label?: string }>;
  };

  export type CodegenOption = {
    id?: string;
    name: string;
    type: 'boolean' | 'enum' | 'string' | 'number';
    default?: unknown;
    choices?: Array<{ key: string; name: string }>;
    description?: string;
  };

  export interface Codegen {
    getLanguageList(): CodegenLanguage[];

    getOptions(
      language: string,
      variant: string,
      cb: (err: Error | null, opts?: CodegenOption[]) => void
    ): void;

    convert(
      language: string,
      variant: string,
      request: Request,
      options: Record<string, unknown>,
      cb: (err: Error | null, snippet?: string) => void
    ): void;
  }

  const codegen: Codegen;
  export = codegen;
}
