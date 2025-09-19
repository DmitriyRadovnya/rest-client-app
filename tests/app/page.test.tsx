import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeEach } from "vitest";
import type { User } from "@supabase/supabase-js";

import * as supabaseServer from "@/lib/providers/supabase/server";
import { fakeClient } from "tests/mocks/supabaseClientMock";
import Page from "@/app/page";

vi.mock("@/lib/providers/supabase/server");
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

describe("Page", () => {
  let clientMock = fakeClient();

  beforeEach(() => {
    vi.resetAllMocks();
    clientMock = fakeClient();
    vi.mocked(supabaseServer.createClient).mockResolvedValue(clientMock);
  });

  it("render Sign In / Sign Up for guest", async () => {

    const element = await Page();
    render(element);

    expect(await screen.findByRole("link", { name: /sign in/i })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /sign up/i })).toBeInTheDocument();
  });

  it("render Welcome and links for logged-in user", async () => {
    const user: Partial<User> = {
      id: "123",
      email: "john@example.com",
      user_metadata: { username: "John" },
    };

    vi.mocked(clientMock.auth.getUser).mockResolvedValue({
      data: { user: user as User },
      error: null,
    });

    const element = await Page();
    render(element);

    expect(screen.getByRole("link", { name: /REST Client/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /History/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Variables/i })).toBeInTheDocument();
  });
});
