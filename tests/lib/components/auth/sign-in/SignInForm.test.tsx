import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as signinActions from '@/app/signin/actions';
import { vi } from 'vitest';
import { SignInForm } from '@/lib/components/auth/sign-in/SignInForm';

vi.mock('@/app/signin/actions', () => ({
  login: vi.fn(),
}));

const mockLogin = vi.mocked(signinActions.login);

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render the form correctly', async () => {
    render(<SignInForm />);

    screen.getByRole('heading', { name: /sign in/i })
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('call login successfully without showing an error', async () => {

    mockLogin.mockResolvedValueOnce(undefined);

    render(<SignInForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123!',
      });
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an error when login fails', async () => {
    mockLogin.mockResolvedValueOnce({ error: 'Invalid credentials' });

    render(<SignInForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
  });
});
