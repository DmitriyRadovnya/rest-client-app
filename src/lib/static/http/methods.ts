import { MethodMeta, MethodType } from '@/lib/static/http/methods.types';

export const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

export const METHOD_META = {
  GET: { label: 'GET' },
  POST: { label: 'POST' },
  PUT: { label: 'PUT' },
  DELETE: { label: 'DELETE' },
  PATCH: { label: 'PATCH' },
} as const satisfies Record<MethodType, MethodMeta>;
