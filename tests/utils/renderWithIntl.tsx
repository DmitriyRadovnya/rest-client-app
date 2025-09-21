import { NextIntlClientProvider } from "next-intl";
import { render } from "@testing-library/react";

const messages = {
  Header: {
    signin: "Sign In",
    signup: "Sign Up",
    signout: "Sign Out",
  },
};

export function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}