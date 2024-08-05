import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import { GoBackButton } from '../GoBackButton';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('GoBackButton', () => {
  test('renders the go back button', () => {
    render(<GoBackButton />);
    expect(
      screen.getByRole('button', { name: /go back/i }),
    ).toBeInTheDocument();
  });

  test('calls navigate with -1 when clicked', () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    render(<GoBackButton />);

    fireEvent.click(screen.getByRole('button', { name: /go back/i }));
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
