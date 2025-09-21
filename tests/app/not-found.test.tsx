import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import NotFound from "@/app/[locale]/not-found";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      title: "Page not found",
      description: "Sorry, this page does not exist.",
      backHome: "Return to home page",
    };
    return dict[key] ?? key;
  },
  useLocale: () => "ru",
}));

interface MockLinkProps {
  href: string;
  locale: string;
  children: ReactNode;
}

vi.mock("@/i18n/routing", () => ({
  Link: ({ href, locale, children }: MockLinkProps) => (
    <a href={`/${locale}${href}`} data-locale={locale}>
      {children}
    </a>
  ),
}));

describe("NotFound", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("render 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("render translated title and description", () => {
    render(<NotFound />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(screen.getByText("Sorry, this page does not exist.")).toBeInTheDocument();
  });

  it("renders back home button with localized link", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /return to home page/i });
    expect(link).toHaveAttribute("href", "/ru/");
    expect(link).toHaveAttribute("data-locale", "ru");
  });
});
