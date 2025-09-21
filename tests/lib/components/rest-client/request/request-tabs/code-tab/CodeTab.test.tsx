import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { CODE_VARIANTS } from "@/lib/static/codeGen/codeGen";
import { UserRequest } from "@/lib/components/rest-client/request/request.types";
import CodeTab from "@/lib/components/rest-client/request/request-tabs/code-tab/CodeTab";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      languageVariant: "Language / Variant",
      code: "Code",
    };
    return dict[key] ?? key;
  },
}));

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<UserRequest>({
    defaultValues: {
      codeVariant: CODE_VARIANTS[0],
      snippet: "",
      method: "GET",
      url: "https://",
      headers: [],
      body: "",
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("CodeTab", () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it("render Autocomplete and snippet TextField", () => {
    render(
      <Wrapper>
        <CodeTab />
      </Wrapper>
    );

    expect(screen.getByLabelText("Language / Variant")).toBeInTheDocument();
    expect(screen.getByLabelText("Code")).toBeInTheDocument();
  });

  it("call fetch and updates snippet when codeVariant changes", async () => {
    const mockResponse = {
      json: async () => ({ snippet: 'console.log("hello")' }),
    } as Response;

    global.fetch = vi.fn(async () => mockResponse) as typeof fetch;

    render(
      <Wrapper>
        <CodeTab />
      </Wrapper>
    );

    const autocomplete = screen.getByLabelText("Language / Variant");
    const snippetField = screen.getByLabelText("Code") as HTMLTextAreaElement;

    const newVariant = CODE_VARIANTS[1];
    await userEvent.click(autocomplete);
    await userEvent.click(screen.getByText(newVariant.label));

    await waitFor(() =>
      expect(snippetField.value).toBe('console.log("hello")')
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/codegen",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("show error snippet if fetch fails", async () => {
    global.fetch = vi.fn(async () => {
      throw new Error("Network error");
    }) as typeof fetch;

    render(
      <Wrapper>
        <CodeTab />
      </Wrapper>
    );

    const snippetField = screen.getByLabelText("Code") as HTMLTextAreaElement;

    await waitFor(() =>
      expect(snippetField.value).toContain("// Codegen error: Network error")
    );
  });
});
