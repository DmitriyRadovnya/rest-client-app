import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AuthError, Session } from "@supabase/supabase-js";
import { login, type LoginResult } from "@/app/[locale]/signin/actions";

vi.mock("@/lib/providers/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

import { createClient } from "@/lib/providers/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { vi } from "vitest";

describe("login action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("return error if credentials are invalid", async () => {
    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { session: null },
          error: { message: "Invalid login" } as AuthError,
        }),
      },
    });

    (headers as vi.Mock).mockReturnValue(new Map([["referer", "http://localhost/en"]]));

    const result: LoginResult = await login({ email: "test", password: "wrong" });

    expect(result).toEqual({ error: "Invalid login credentials" });
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("redirect if credentials are valid", async () => {
    const session = { access_token: "abc" } as Session;

    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { session },
          error: null,
        }),
        setSession: vi.fn().mockResolvedValue({}),
      },
    });

    (headers as vi.Mock).mockReturnValue(
      new Map([["referer", "http://localhost/ru/profile"]])
    );

    await login({ email: 'user@mail.com', password: 'secret' });

    expect(revalidatePath).toHaveBeenCalledWith("/ru", "layout");
    expect(redirect).toHaveBeenCalledWith("/ru");
  });

  it("default to 'en' locale if referer is missing", async () => {
    const session = { access_token: "abc" } as Session;

    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { session },
          error: null,
        }),
        setSession: vi.fn().mockResolvedValue({}),
      },
    });

    (headers as vi.Mock).mockReturnValue(new Map());

    await login({ email: "user@mail.com", password: "secret" });

    expect(revalidatePath).toHaveBeenCalledWith("/en", "layout");
    expect(redirect).toHaveBeenCalledWith("/en");
  });
});
