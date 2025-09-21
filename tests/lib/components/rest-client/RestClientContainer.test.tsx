import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClientContainer from '@/lib/components/rest-client/RestClientContainer';


vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) => {
    const dict: Record<string, string> = {
      method: 'Method',
      enterUrl: 'Enter URL',
      send: 'Send',
      firstRequest: 'Send your first request',
      error: `Error: ${values?.message ?? ''}`,
    };
    return dict[key] ?? key;
  },
}));

describe('RestClientContainer', () => {
  it('render without crashing and shows key elements of RequestForm', () => {
    render(<RestClientContainer />);

    const urlInput = screen.getByLabelText(/Enter URL/i);
    expect(urlInput).toBeInTheDocument();

    const methodSelect = screen.getByLabelText(/Method/i);
    expect(methodSelect).toBeInTheDocument();

    const sendButton = screen.getByRole('button', { name: /Send/i });
    expect(sendButton).toBeInTheDocument();

    expect(screen.getByText(/Send your first request/i)).toBeInTheDocument();
  });
});

