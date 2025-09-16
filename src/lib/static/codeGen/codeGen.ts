export const CODE_LANGS = [
  'curl',
  'js-fetch',
  'js-xhr',
  'nodejs',
  'python',
  'java',
  'csharp',
  'go',
] as const;

export const CODE_LANG_META: Record<CodeLangKey, CodeLangMeta> = {
  curl: { label: 'curl' },
  'js-fetch': { label: 'JavaScript (Fetch API)' },
  'js-xhr': { label: 'JavaScript (XHR)' },
  nodejs: { label: 'NodeJS' },
  python: { label: 'Python' },
  java: { label: 'Java' },
  csharp: { label: 'C#' },
  go: { label: 'Go' },
};
