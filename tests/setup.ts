import "@testing-library/jest-dom";

vi.mock("@/lib/providers/supabase/server");

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));