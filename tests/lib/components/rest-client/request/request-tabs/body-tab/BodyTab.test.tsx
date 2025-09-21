import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { checkContentType } from "@/lib/utils/checkContentType";
import BodyTab from "@/lib/components/rest-client/request/request-tabs/body-tab/BodyTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      json: "JSON",
      text: "Text",
      prettify: "Prettify",
      minify: "Minify",
      invalidJson: "Enter valid JSON",
    };
    return dict[key] ?? key;
  },
}));

vi.mock("@/lib/utils/checkContentType", () => ({
  checkContentType: vi.fn((headers) => headers),
}));

vi.mock("@/lib/utils/isJSON", () => ({
  isJSON: vi.fn((value) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),
}));

describe("BodyTab", () => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({
      defaultValues: {
        body: "",
        bodyMode: "json",
        headers: [],
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("render JSON/Text toggle and buttons", () => {
    render(
      <Wrapper>
        <BodyTab />
      </Wrapper>
    );

    expect(screen.getByRole("button", { name: "JSON" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Text" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Prettify" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Minify" })).toBeDisabled();
  });

  it("call checkContentType when switching back to JSON mode", async () => {
    render(
      <Wrapper>
        <BodyTab />
      </Wrapper>
    );

    const user = userEvent.setup();
    const toggleText = screen.getByRole("button", { name: "Text" });
    await user.click(toggleText);

    const toggleJson = screen.getByRole("button", { name: "JSON" });
    await user.click(toggleJson);

    expect(checkContentType).toHaveBeenCalled();
  });
});
