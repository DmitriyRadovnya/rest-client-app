import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

vi.mock('@/lib/providers/supabase/server');

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

vi.mock("next-intl/navigation", () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
    Link: ({ children, href }: { children: React.ReactNode; href: string }) =>
      React.createElement("a", { href }, children),

    createNavigation: () => ({
      useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn(),
      }),
      Link: ({ children, href }: { children: React.ReactNode; href: string }) =>
        React.createElement("a", { href }, children),
      getPathname: () => "/",
    }),
  };
});

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next-intl", async () => {
  const actual: typeof import("next-intl") = await vi.importActual("next-intl");
  return {
    ...actual,
    useLocale: () => "en",
    useTranslations: () => (key: string) => {
      const messages = {
        Header: {
          signin: "Sign In",
          signup: "Sign Up",
          signout: "Sign Out",
        },
      };

      return messages.Header[key as keyof typeof messages.Header];
    },
  };
});
