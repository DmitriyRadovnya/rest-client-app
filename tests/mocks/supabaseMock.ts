import { vi } from "vitest";

export const mockSupabaseClient = {
  auth: {
    getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
  },
};

vi.mock("@/lib/providers/supabase/server", () => ({
  createClient: () => mockSupabaseClient,
}));