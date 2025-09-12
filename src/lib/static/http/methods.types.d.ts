import { METHODS } from '@/lib/static/http/methods';

declare type MethodType = (typeof METHODS)[number];
declare type MethodMeta = { label: string };
