import Page from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Page component", () => {
  it("renders main content text", () => {
    render(<Page />);
    expect(screen.getByText(/main content here/i)).toBeInTheDocument();
  });

  it("renders long content inside Box", () => {
    render(<Page />);
    expect(
      screen.getByText(/example very long content/i)
    ).toBeInTheDocument();
  });
});