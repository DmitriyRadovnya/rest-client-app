import { vi } from "vitest";
import type { SupabaseClient, Session, AuthError, User } from "@supabase/supabase-js";

export const fakeClient = (options?: {
  session?: Session | null;
  error?: AuthError | null;
  user?: User | null;
}) => {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: options?.user ?? null },
        error: options?.error ?? null,
      }),
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { session: options?.session ?? null },
        error: options?.error ?? null,
      }),
      signUp: vi.fn().mockResolvedValue({
        data: { session: options?.session ?? null },
        error: options?.error ?? null,
      }),
      setSession: vi.fn(),
      signOut: vi.fn(),
    },
  } as unknown as SupabaseClient;
};
