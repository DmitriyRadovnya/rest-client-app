import { CODE_LANGS } from '@/lib/static/codeGen/codeGen';

declare type CodeLangType = (typeof CODE_LANGS)[number];

declare type CodeLangMeta = {
  label: string;
};
