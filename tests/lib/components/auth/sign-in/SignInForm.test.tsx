import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, Mock } from "vitest";
import { SignInForm } from "@/lib/components/auth/sign-in/SignInForm";


const messages = {
  SignInForm: {
    title: "Sign In",
    email: "Email",
    password: "Password",
    signin: "Sign In",
    signingIn: "Signing In...",
  },
} as const;

vi.mock("next-intl", () => ({
  useTranslations:
    (ns?: keyof typeof messages) =>
    (key: keyof (typeof messages)["SignInForm"]) => {
      if (!ns) return key;
      return messages[ns][key];
    },
  useLocale: () => "en",
}));

vi.mock("@/app/[locale]/signin/actions", () => ({
  login: vi.fn(),
}));

import { login } from "@/app/[locale]/signin/actions";

describe("SignInForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("render the form correctly", () => {
    render(<SignInForm />);

    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("call login successfully without showing an error", async () => {
    (login as Mock).mockResolvedValueOnce(undefined);

    render(<SignInForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123!");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123!",
      });
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("show an error when login fails", async () => {
    (login as Mock).mockResolvedValueOnce({
      error: "Invalid credentials",
    });

    render(<SignInForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "wrong@example.com");
    await user.type(screen.getByLabelText(/password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid credentials"
    );
  });
});

