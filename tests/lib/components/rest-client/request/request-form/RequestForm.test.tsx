import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import RequestForm from '@/lib/components/rest-client/request/request-form/RequestForm';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      method: 'Method',
      enterUrl: 'Enter URL',
      send: 'Send',
      invalidUrl: 'Enter valid URL',
    };
    return dict[key] ?? key;
  },
}));

describe('RequestForm', () => {
  const Wrapper = ({
    defaultValues,
  }: {
    defaultValues?: Partial<UserRequest>;
  }) => {
    const methods = useForm<UserRequest>({
      defaultValues: {
        method: 'GET',
        url: '',
        headers: [],
        body: '',
        ...defaultValues,
      },
    });

    return (
      <FormProvider {...methods}>
        <RequestForm onSuccess={vi.fn()} onError={vi.fn()} />
      </FormProvider>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('render method select, url input and send button', () => {
    render(<Wrapper />);

    expect(screen.getByLabelText(/Method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid url', async () => {
    render(<Wrapper />);

    await userEvent.type(screen.getByLabelText(/Enter URL/i), 'not-a-url');
    await userEvent.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/Enter valid URL/i)).toBeInTheDocument();
  });

  it('call fetch with correct params on valid GET request', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;

    render(
      <Wrapper defaultValues={{ url: 'https://example.com', method: 'GET' }} />
    );

    await userEvent.click(screen.getByRole('button', { name: /Send/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://example.com', {
        method: 'GET',
        headers: new Headers(),
        body: undefined,
      });
    });
  });

  it('open snackbar when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network error'));

    render(
      <Wrapper defaultValues={{ url: 'https://example.com', method: 'GET' }} />
    );

    await userEvent.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/Error/i)).toBeInTheDocument();
  });
});
