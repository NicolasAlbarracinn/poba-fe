import { render, screen } from '@testing-library/react';
import React from 'react';
import Loader from '../Loader';

describe('Loader', () => {
  test('renders the loader with backdrop and circular progress', () => {
    render(<Loader />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });
});
