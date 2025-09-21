import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import SignInPage from "@/app/[locale]/signin/page";

vi.mock("@/lib/providers/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === "title") return "Sign In";
    if (key === "signin") return "Sign In";
    if (key === "email") return "Email";
    if (key === "password") return "Password";
    return key;
  },
}));

import { createClient } from "@/lib/providers/supabase/server";
import { redirect } from "next/navigation";

describe("SignInPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("render SignInForm when user is not authenticated", async () => {
    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
    });

    const element = await SignInPage();
    render(element);

    expect(await screen.findByRole("heading", { name: "Sign In" })).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("redirect to home when user is authenticated", async () => {
    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "123" } }, error: null }),
      },
    });

    await SignInPage();

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
