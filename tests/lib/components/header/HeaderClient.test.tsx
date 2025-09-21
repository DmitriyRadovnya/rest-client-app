import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach } from 'vitest';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/providers/supabase/client';
import { useRouter } from 'next/navigation';
import { HeaderClient } from '@/lib/components/header/HeaderClient';

vi.mock('@/lib/providers/supabase/client', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/lib/components/SignOutButton', () => ({
  SignOutButton: ({ onSignOut }: { onSignOut: () => void }) => (
    <button onClick={onSignOut}>Sign Out</button>
  ),
}));

describe('HeaderClient', () => {
  let mockedSupabase: ReturnType<typeof createClient>;
  let mockedRouter: ReturnType<typeof useRouter>;

  beforeEach(() => {
    vi.resetAllMocks();

    mockedSupabase = {
      auth: {
        getUser: vi
          .fn()
          .mockResolvedValue({
            data: { user: null } as { user: User | null },
            error: null,
          }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
      },
    } as unknown as ReturnType<typeof createClient>;

    mockedRouter = { push: vi.fn(), refresh: vi.fn() } as unknown as ReturnType<
      typeof useRouter
    >;

    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockedSupabase
    );
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockedRouter
    );
  });

  it('render Sign In / Sign Up for guest', async () => {
    render(<HeaderClient initialUser={null} />);
    expect(
      await screen.findByRole('link', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it('render SignOutButton for logged-in user', async () => {
    const user: User = {
      id: '1',
      email: 'john@example.com',
      user_metadata: { username: 'John' },
    } as unknown as User;
    mockedSupabase.auth.getUser = vi
      .fn()
      .mockResolvedValue({ data: { user }, error: null });
    render(<HeaderClient initialUser={user} />);
    expect(await screen.findByText(/sign out/i)).toBeInTheDocument();
  });

  it('call router.push and refresh on sign out', async () => {
    const user: User = {
      id: '1',
      email: 'john@example.com',
      user_metadata: { username: 'John' },
    } as unknown as User;
    mockedSupabase.auth.getUser = vi
      .fn()
      .mockResolvedValue({ data: { user }, error: null });
    render(<HeaderClient initialUser={user} />);

    const button = await screen.findByText(/sign out/i);
    await userEvent.click(button);

    expect(mockedSupabase.auth.signOut).toHaveBeenCalled();
    expect(mockedRouter.refresh).toHaveBeenCalled();
    expect(mockedRouter.push).toHaveBeenCalledWith('/');
  });
});
