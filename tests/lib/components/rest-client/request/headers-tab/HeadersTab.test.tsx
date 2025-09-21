import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import HeadersTab from '@/lib/components/rest-client/request/request-tabs/headers-tab/HeadersTab';


vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      addHeader: 'Add header',
    };
    return dict[key] ?? key;
  },
}));

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<UserRequest>({
    defaultValues: { headers: [] },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('HeadersTab', () => {
  it('add a new header when clicking the add button', async () => {
    render(
      <Wrapper>
        <HeadersTab />
      </Wrapper>
    );

    const addButton = screen.getByRole('button', { name: /add header/i });
    await userEvent.click(addButton);

    const keyInput = screen.getByLabelText(/key/i);
    const valueInput = screen.getByLabelText(/value/i);
    const checkbox = screen.getByRole('checkbox');

    expect(keyInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('remove a header when clicking the delete icon', async () => {
    render(
      <Wrapper>
        <HeadersTab />
      </Wrapper>
    );

    const addButton = screen.getByRole('button', { name: /add header/i });
    await userEvent.click(addButton);

    const deleteButton = screen.getByRole('button', { name: /delete header/i });
    await userEvent.click(deleteButton);

    expect(screen.queryByLabelText(/key/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/value/i)).not.toBeInTheDocument();
  });

  it('allows editing key, value, and checkbox', async () => {
    render(
      <Wrapper>
        <HeadersTab />
      </Wrapper>
    );

    const addButton = screen.getByRole('button', { name: /add header/i });
    await userEvent.click(addButton);

    const keyInput = screen.getByLabelText(/key/i);
    const valueInput = screen.getByLabelText(/value/i);
    const checkbox = screen.getByRole('checkbox');

    await userEvent.clear(keyInput);
    await userEvent.type(keyInput, 'Authorization');

    await userEvent.clear(valueInput);
    await userEvent.type(valueInput, 'Bearer token');

    await userEvent.click(checkbox);

    expect(keyInput).toHaveValue('Authorization');
    expect(valueInput).toHaveValue('Bearer token');
    expect(checkbox).not.toBeChecked();
  });
});
