import { screen } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/providers/supabase/client";
import { HeaderClient } from "@/lib/components/header/HeaderClient";
import { renderWithIntl } from "tests/utils/renderWithIntl";

vi.mock("@/lib/providers/supabase/client", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/components/SignOutButton", () => ({
  SignOutButton: ({ onSignOut }: { onSignOut: () => void }) => (
    <button onClick={onSignOut}>Sign Out</button>
  ),
}));

describe("HeaderClient", () => {
  let mockedSupabase: ReturnType<typeof createClient>;

  beforeEach(() => {
    vi.resetAllMocks();

    mockedSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null } as { user: User | null },
          error: null,
        }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
      },
    } as unknown as ReturnType<typeof createClient>;

    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockedSupabase
    );
  });

  it("render Sign In / Sign Up for guest", async () => {
    renderWithIntl(<HeaderClient initialUser={null} />);

    expect(
      await screen.findByRole("link", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("render SignOutButton for logged-in user", async () => {
    const user: User = {
      id: "1",
      email: "john@example.com",
      user_metadata: { username: "John" },
    } as unknown as User;

    mockedSupabase.auth.getUser = vi.fn().mockResolvedValue({
      data: { user },
      error: null,
    });

    renderWithIntl(<HeaderClient initialUser={user} />);

    expect(await screen.findByText(/sign out/i)).toBeInTheDocument();
  });
});



