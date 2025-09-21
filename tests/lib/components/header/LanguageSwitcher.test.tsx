import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/en/dashboard",
}));

vi.mock("next-intl", () => ({
  useLocale: () => "en",
}));

import { LanguageSwitcher } from "@/lib/components/header/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    pushMock.mockClear();
    document.cookie = "";
  });

  it("render the language button", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("open the menu when clicking the button", async () => {
    render(<LanguageSwitcher />);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByText("English")).toBeInTheDocument();
    expect(await screen.findByText("Русский")).toBeInTheDocument();
  });

  it("change locale to Russian and updates pathname", async () => {
    render(<LanguageSwitcher />);
    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByText("Русский"));

    expect(pushMock).toHaveBeenCalledWith("/ru/dashboard");
    expect(document.cookie).toContain("locale=ru");
  });

  it("do not push when selecting the same locale", async () => {
    render(<LanguageSwitcher />);
    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByText("English"));

    expect(pushMock).not.toHaveBeenCalled();
  });
});