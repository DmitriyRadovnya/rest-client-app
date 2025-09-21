import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AuthError, Session } from "@supabase/supabase-js";
import { signup } from "@/app/[locale]/signup/actions";
import type { SignUpValues } from "@/lib/validation/auth.schema";
import { vi } from "vitest";

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

describe("signup action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("return error if signUp fails", async () => {
    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        signUp: vi.fn().mockResolvedValue({
          error: { message: "Email already exists" } as AuthError,
        }),
      },
    });

    (headers as vi.Mock).mockReturnValue(new Map([["referer", "http://localhost/en"]]));

    const values: SignUpValues = {
      username: "test",
      email: "test@test.com",
      password: "123456",
    };

    const result = await signup(values);

    expect(result).toEqual({ error: "Email already exists" });
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("call revalidatePath and redirect if signUp succeeds", async () => {
    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        signUp: vi.fn().mockResolvedValue({
          error: null,
          data: { session: { access_token: "abc" } as Session },
        }),
      },
    });

    (headers as vi.Mock).mockReturnValue(
      new Map([["referer", "http://localhost/ru/profile"]])
    );

    const values: SignUpValues = {
      username: "test",
      email: "user@mail.com",
      password: "secret",
    };

    await signup(values);

    expect(revalidatePath).toHaveBeenCalledWith("/ru", "layout");
    expect(redirect).toHaveBeenCalledWith("/ru");
  });

  it("default to 'en' locale if referer is missing", async () => {
    (createClient as vi.Mock).mockResolvedValue({
      auth: {
        signUp: vi.fn().mockResolvedValue({
          error: null,
          data: { session: { access_token: "abc" } as Session },
        }),
      },
    });

    (headers as vi.Mock).mockReturnValue(new Map());

    const values: SignUpValues = {
      username: "test",
      email: "user@mail.com",
      password: "secret",
    };

    await signup(values);

    expect(revalidatePath).toHaveBeenCalledWith("/en", "layout");
    expect(redirect).toHaveBeenCalledWith("/en");
  });
});
