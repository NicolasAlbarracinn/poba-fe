import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CardForm } from 'components/CardForm';
import { Errors } from 'hooks/useValidateForm';
import { PokemonCard } from 'interfaces/cards';

const mockHandleSubmit = vi.fn();
const mockHandleChange = vi.fn();

const mockFormData: PokemonCard = {
  name: 'Pikachu',
  expansion: 'Base Set',
  cardCode: '001',
  image: 'test_image.png',
  hp: 35,
  attack: 55,
  type: 'Electric',
  resist: 'Flying',
  weak: 'Ground',
};

const mockErrors: Errors = {
  name: '',
  expansion: '',
  cardCode: '',
  image: '',
  hp: '',
  attack: '',
  type: '',
};

const renderComponent = (props = {}) => {
  const defaultProps = {
    handleSubmit: mockHandleSubmit,
    handleChange: mockHandleChange,
    formData: mockFormData,
    errors: mockErrors,
    formTitle: 'Add Pokemon Card',
    submitLabel: 'Submit',
    submitDisable: false,
    ...props,
  };

  return render(
    <Router>
      <CardForm {...defaultProps} />
    </Router>,
  );
};

describe('CardForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the form with all fields', () => {
    renderComponent();

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expansion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/HP/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Attack/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Resistance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weakness/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it('should call handleChange on text field change', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Charmander' },
    });
    expect(mockHandleChange).toHaveBeenCalledWith('name', 'Charmander');

    fireEvent.change(screen.getByLabelText(/HP/i), {
      target: { value: '45', type: 'number' },
    });
    expect(mockHandleChange).toHaveBeenCalledWith('hp', 45);
  });

  it('should call handleChange on select field change', () => {
    renderComponent();
    fireEvent.mouseDown(screen.getByLabelText(/Type/i));
    const typeOption = screen.getByRole('option', { name: /Fire/i });
    fireEvent.click(typeOption);
    expect(mockHandleChange).toHaveBeenCalledWith('type', 'Fire');

    fireEvent.mouseDown(screen.getByLabelText(/Resistance/i));
    const resistOption = screen.getByRole('option', { name: /Water/i });
    fireEvent.click(resistOption);
    expect(mockHandleChange).toHaveBeenCalledWith('resist', 'Water');
  });

  it('should call handleSubmit on form submit', () => {
    renderComponent();

    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should render errors when they exist', () => {
    const errorProps: Errors = {
      ...mockErrors,
      name: 'Name is required',
      hp: 'HP must be a number',
    };

    renderComponent({ errors: errorProps });

    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/HP must be a number/i)).toBeInTheDocument();
  });

  it('should disable the submit button when submitDisable is true', () => {
    renderComponent({ submitDisable: true });

    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });
});
