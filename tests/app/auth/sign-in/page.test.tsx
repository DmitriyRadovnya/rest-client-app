import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { mockSupabaseClient } from "tests/mocks/supabaseMock";
import Page from "@/app/signin/page";

describe("SignIn page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSupabaseClient.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
  });

  it("render SignInForm", async () => {
    const element = await Page();
    render(element);

    expect(await screen.findByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  });
});