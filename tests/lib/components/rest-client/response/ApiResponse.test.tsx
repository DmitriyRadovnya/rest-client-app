import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApiResponse from '@/lib/components/rest-client/response/ApiResponse';

const mockData = {
  status: 200,
  statusText: 'OK',
  headers: {
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  },
  body: {
    user: {
      id: 1,
      name: 'Alice',
      roles: ['admin', 'user'],
    },
    active: true,
    score: 42,
  },
};

describe('ApiResponse', () => {
  it('renders the header and Status section by default', () => {
    render(<ApiResponse data={mockData} />);

    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByText(/Status code: 200 OK/i)).toBeInTheDocument();
  });

  it('goes to the Headers tab and displays the headers', async () => {
    render(<ApiResponse data={mockData} />);

    await userEvent.click(screen.getByRole('tab', { name: /headers/i }));

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');

    expect(items).toHaveLength(2);
    expect(within(items[0]).getByText('content-type')).toBeInTheDocument();
    expect(within(items[0]).getByText('application/json')).toBeInTheDocument();
  });

  it('goes to the Body tab and renders the body', async () => {
    render(<ApiResponse data={mockData} />);

    await userEvent.click(screen.getByRole('tab', { name: /body/i }));

    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });

  it('displays a message when the body is empty', async () => {
    render(<ApiResponse data={{ ...mockData, body: null }} />);

    await userEvent.click(screen.getByRole('tab', { name: /body/i }));

    expect(screen.getByText(/Response body is empty./i)).toBeInTheDocument();
  });
});
