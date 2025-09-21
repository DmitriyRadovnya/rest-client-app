import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { signup } from '@/app/signup/actions';
import { SignUpForm } from '@/lib/components/auth/sign-up/SignUpForm';

vi.mock('@/app/signup/actions', () => ({
  signup: vi.fn(),
}));

describe('SignUpForm', () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    return { user };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render all input fields and submit button', () => {
    setup();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it('show validation errors on empty submit', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('call signup function with correct values', async () => {
    (signup as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    const { user } = setup();

    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password123!');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
      });
    });
  });

  it('display error message if signup returns error', async () => {
    (signup as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      error: 'User already exists',
    });
    const { user } = setup();

    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password123!');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/user already exists/i)).toBeInTheDocument();
    });
  });
});
