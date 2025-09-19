import { describe, it, expect, vi } from "vitest";
import type { AuthError, Session } from "@supabase/supabase-js";
import { login, type LoginResult } from "@/app/signin/actions";
import * as supabaseServer from "@/lib/providers/supabase/server";
import * as nextNavigation from "next/navigation";
import * as nextCache from "next/cache";
import { fakeClient } from "tests/mocks/supabaseClientMock";

const mockedSupabase = vi.mocked(supabaseServer);
const mockedNavigation = vi.mocked(nextNavigation);
const mockedCache = vi.mocked(nextCache);

describe("login", () => {
  it("return error if credentials are invalid", async () => {
    mockedSupabase.createClient.mockResolvedValue(
      fakeClient({
        session: null,
        error: { message: "Invalid login" } as AuthError,
      })
    );

    const result: LoginResult = await login({ email: "test", password: "wrong" });
    expect(result).toEqual({ error: "Invalid login credentials" });
  });

  it("redirect if credentials are valid", async () => {
    mockedSupabase.createClient.mockResolvedValue(
      fakeClient({
        session: { access_token: "abc" } as Session,
        error: null,
      })
    );

    await login({ email: "user@mail.com", password: "secret" });

    expect(mockedCache.revalidatePath).toHaveBeenCalledWith("/", "layout");
    expect(mockedNavigation.redirect).toHaveBeenCalledWith("/");
  });
});