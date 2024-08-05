import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Autocomplete } from 'components/Autocomplete';

const mockOptions = [
  { id: '1', name: 'op1', cardCode: 'smn-1' },
  { id: '2', name: 'op2', cardCode: 'smn-2' },
  { id: '3', name: 'op3', cardCode: 'smn-3' },
];

describe('Autocomplete Component', () => {
  it('should render the component with provided label', () => {
    render(
      <Autocomplete
        searchOptions={mockOptions}
        handleInputChange={vi.fn()}
        handleSearchChange={vi.fn()}
        label="Test Label"
      />,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should display options when input changes', () => {
    const handleInputChange = vi.fn();
    render(
      <Autocomplete
        searchOptions={mockOptions}
        handleInputChange={handleInputChange}
        handleSearchChange={vi.fn()}
        label="Test Label"
      />,
    );

    const inputElement = screen.getByLabelText('Test Label');
    fireEvent.change(inputElement, { target: { value: 'Option' } });
    fireEvent.focus(inputElement);
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });

    expect(handleInputChange).toHaveBeenCalledWith(
      expect.anything(),
      'Option',
      'input',
    );
    expect(screen.getByText('op1 - smn-1')).toBeInTheDocument();
    expect(screen.getByText('op2 - smn-2')).toBeInTheDocument();
    expect(screen.getByText('op3 - smn-3')).toBeInTheDocument();
  });

  it('should call handleSearchChange when an option is selected', () => {
    const handleSearchChange = vi.fn();
    render(
      <Autocomplete
        searchOptions={mockOptions}
        handleInputChange={vi.fn()}
        handleSearchChange={handleSearchChange}
        label="Test Label"
      />,
    );

    const inputElement = screen.getByLabelText('Test Label');
    fireEvent.change(inputElement, { target: { value: 'Option' } });

    fireEvent.focus(inputElement);
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText('op1 - smn-1'));

    expect(handleSearchChange).toHaveBeenCalledWith(
      expect.anything(),
      {
        id: '1',
        name: 'op1',
        cardCode: 'smn-1',
      },
      'selectOption',
      { option: { id: '1', name: 'op1', cardCode: 'smn-1' } },
    );
  });
});
