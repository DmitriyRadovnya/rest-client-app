import { render, screen } from '@testing-library/react';
import { vi, describe, it, beforeEach } from 'vitest';
import { mockSupabaseClient } from 'tests/mocks/supabaseMock';
import SignUpPage from '@/app/signup/page';
import { redirect } from 'next/navigation';

vi.mock('next/navigation', () => ({ redirect: vi.fn() }));

describe('SignUp page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });
  });

  it('render SignUpForm if user is not logged in', async () => {
    const element = await SignUpPage();
    render(element);

    expect(
      await screen.findByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("redirect to '/' if user is logged in", async () => {
    mockSupabaseClient.auth.getUser.mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    await SignUpPage();

    expect(redirect).toHaveBeenCalledWith('/');
  });
});
