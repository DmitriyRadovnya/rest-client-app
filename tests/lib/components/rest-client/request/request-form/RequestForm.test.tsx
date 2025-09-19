import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { UserRequest } from "@/lib/components/rest-client/request/request.types";
import RequestForm from "@/lib/components/rest-client/request/request-form/RequestForm";

describe("RequestForm", () => {
  const Wrapper = ({ defaultValues }: { defaultValues?: Partial<UserRequest> }) => {
    const methods = useForm<UserRequest>({
      defaultValues: {
        method: "GET",
        url: "",
        headers: [],
        body: "",
        ...defaultValues,
      },
    });

    return (
      <FormProvider {...methods}>
        <RequestForm />
      </FormProvider>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("render method select, url input and send button", () => {
    render(<Wrapper />);

    expect(screen.getByLabelText(/method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/enter url/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("shows validation error for invalid url", async () => {
    render(<Wrapper />);

    await userEvent.type(screen.getByLabelText(/enter url/i), "not-a-url");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/enter valid url/i)).toBeInTheDocument();
  });

  it("call fetch with correct params on valid GET request", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;

    render(<Wrapper defaultValues={{ url: "https://example.com", method: "GET" }} />);

    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("https://example.com", {
        method: "GET",
        headers: new Headers(),
        body: undefined,
      });
    });
  });

  it("open snackbar when fetch throws", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network error"));

    render(<Wrapper defaultValues={{ url: "https://example.com", method: "GET" }} />);

    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByText(/message should be here/i)).toBeInTheDocument();
  });
});
