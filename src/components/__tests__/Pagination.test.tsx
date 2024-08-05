import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const setup = ({
    page = 1,
    totalPages = 10,
    cardsPerPage = 10,
    handlePageChange = vi.fn(),
    handleCardsPerPageChange = vi.fn(),
  } = {}) => {
    render(
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        cardsPerPage={cardsPerPage}
        handleCardsPerPageChange={handleCardsPerPageChange}
      />,
    );
    return { handlePageChange, handleCardsPerPageChange };
  };

  test('renders the pagination component', () => {
    setup();
    expect(screen.getByText(/Page 1 of 10/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cards per Page/i)).toBeInTheDocument();
  });

  test('calls handlePageChange on page change', () => {
    const { handlePageChange } = setup();

    fireEvent.click(screen.getByRole('button', { name: /2/i }));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  test('calls handleCardsPerPageChange on cards per page change', () => {
    const { handleCardsPerPageChange } = setup();

    fireEvent.mouseDown(screen.getByLabelText(/Cards per Page/i));
    fireEvent.click(screen.getByRole('option', { name: /15/i }));

    expect(handleCardsPerPageChange).toHaveBeenCalledWith(15);
  });
});
