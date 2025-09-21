import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import type { User } from "@supabase/supabase-js";
import * as supabaseServer from "@/lib/providers/supabase/server";
import { fakeClient } from "tests/mocks/supabaseClientMock";
import Page from "@/app/[locale]/page";

vi.mock("@/lib/providers/supabase/server");

describe("Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("render Sign In / Sign Up for guest", async () => {
    const clientMock = fakeClient({ user: null });
    vi.mocked(supabaseServer.createClient).mockResolvedValue(clientMock);

    const element = await Page({ params: { locale: "en" } });
    render(element);

    expect(
      await screen.findByRole('link', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it('render Welcome and links for logged-in user', async () => {
    const user: Partial<User> = {
      id: '123',
      email: 'john@example.com',
      user_metadata: { username: 'John' },
    };

    const clientMock = fakeClient({ user: user as User });
    vi.mocked(supabaseServer.createClient).mockResolvedValue(clientMock);

    const element = await Page({ params: { locale: "en" } });
    render(element);

    expect(
      screen.getByRole('link', { name: /REST Client/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /History/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Variables/i })
    ).toBeInTheDocument();
  });
});



