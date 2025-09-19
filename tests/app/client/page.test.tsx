import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/client/page';

vi.mock('@/lib/components/rest-client/RestClientContainer', () => ({
  default: vi.fn(() => <div>RestClientContainer</div>),
}));

describe('Page', () => {
  it('render RestClientContainer inside MUI Container', () => {
    render(<Page />);

    expect(screen.getByText('RestClientContainer')).toBeInTheDocument();
  });
});
