import { describe, it, expect, vi } from "vitest";
import type { AuthError, Session } from "@supabase/supabase-js";
import { signup } from "@/app/signup/actions";
import * as supabaseServer from "@/lib/providers/supabase/server";
import * as nextNavigation from "next/navigation";
import * as nextCache from "next/cache";
import { fakeClient } from "tests/mocks/supabaseClientMock";
import { SignUpValues } from "@/lib/validation/auth.schema";

const mockedSupabase = vi.mocked(supabaseServer);
const mockedNavigation = vi.mocked(nextNavigation);
const mockedCache = vi.mocked(nextCache);

describe("signup", () => {
  it("return error if signUp fails", async () => {
    mockedSupabase.createClient.mockResolvedValue(
      fakeClient({
        session: null,
        error: { message: "Email already exists" } as AuthError,
      })
    );

    const values: SignUpValues = { username: "test", email: "test@test.com", password: "123456" };
    const result = await signup(values);

    expect(result).toEqual({ error: "Email already exists" });
    expect(mockedCache.revalidatePath).not.toHaveBeenCalled();
    expect(mockedNavigation.redirect).not.toHaveBeenCalled();
  });

  it("redirect if signUp succeeds", async () => {
    mockedSupabase.createClient.mockResolvedValue(
      fakeClient({
        session: { access_token: "abc" } as Session,
        error: null,
      })
    );

    const values: SignUpValues = { username: "test", email: "user@mail.com", password: "secret" };
    await signup(values);

    expect(mockedCache.revalidatePath).toHaveBeenCalledWith("/", "layout");
    expect(mockedNavigation.redirect).toHaveBeenCalledWith("/");
  });
});