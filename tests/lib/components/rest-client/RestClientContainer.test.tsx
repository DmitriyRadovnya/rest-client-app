import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClientContainer from '@/lib/components/rest-client/RestClientContainer';

describe('RestClientContainer', () => {
  it('render without crashing and shows key elements of RequestForm', () => {
    render(<RestClientContainer />);

    const urlInput = screen.getByLabelText(/url/i);
    expect(urlInput).toBeInTheDocument();

    const methodSelect = screen.getByLabelText(/method/i);
    expect(methodSelect).toBeInTheDocument();

    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeInTheDocument();
  });
});