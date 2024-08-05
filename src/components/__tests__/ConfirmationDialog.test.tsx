import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import ConfirmationDialog from 'components/ConfirmationDialog';

describe('ConfirmationDialog', () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    message: 'Are you sure you want to proceed?',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the dialog with the correct message', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    expect(
      screen.getByText('Are you sure you want to proceed?'),
    ).toBeInTheDocument();
  });

  it('should call onConfirm when the Confirm button is clicked', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('should call onClose when the Cancel button is clicked', () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not render the dialog when open is false', () => {
    render(<ConfirmationDialog {...defaultProps} open={false} />);
    expect(
      screen.queryByText('Are you sure you want to proceed?'),
    ).not.toBeInTheDocument();
  });
});
