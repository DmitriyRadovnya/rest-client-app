import type { SupabaseClient, AuthError, Session } from "@supabase/supabase-js";
import { vi } from "vitest";

export const fakeClient = (options?: { session?: Session | null; error?: AuthError | null; user?: object | null }) => {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: options?.user ?? null }, error: null }),
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


