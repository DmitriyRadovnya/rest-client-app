import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { SignUpForm } from "@/lib/components/auth/sign-up/SignUpForm";


vi.mock("@/app/[locale]/signup/actions", () => ({
  signup: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages = {
      title: "Sign Up",
      name: "Name",
      email: "Email",
      password: "Password",
      signup: "Sign Up",
    };
    return messages[key as keyof typeof messages] ?? key;
  },
  useLocale: () => "en",
}));

import { signup } from "@/app/[locale]/signup/actions";

describe("SignUpForm", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    return { user };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("render all input fields and submit button", () => {
    setup();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("show validation errors on empty submit", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("call signup function with correct values", async () => {
    (signup as Mock).mockResolvedValueOnce({});
    const { user } = setup();

    await user.type(screen.getByLabelText(/name/i), "testuser");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "Password123!");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        password: "Password123!",
      });
    });
  });

  it("display error message if signup returns error", async () => {
    (signup as Mock).mockResolvedValueOnce({
      error: "User already exists",
    });
    const { user } = setup();

    await user.type(screen.getByLabelText(/name/i), "testuser");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "Password123!");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/user already exists/i)).toBeInTheDocument();
  });
});
