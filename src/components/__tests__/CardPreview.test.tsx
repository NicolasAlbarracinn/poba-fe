import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { CardPreview } from 'components/CardPreview';
import { PokemonCard } from 'interfaces/cards';

describe('CardPreview', () => {
  const mockData: PokemonCard = {
    cardCode: 'SMJ-01',
    expansion: 'Unifield minds',
    image: 'test_image.png',
    name: 'Pikachu',
    hp: 35,
    attack: 55,
    type: 'Electric',
    resist: 'Flying',
    weak: 'Ground',
  };

  it('should render the card image and details', () => {
    render(<CardPreview data={mockData} />);

    const imgElement = screen.getByAltText(mockData.name);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockData.image);

    expect(screen.getByText(`Hp: ${mockData.hp}`)).toBeInTheDocument();
    expect(screen.getByText(`Attack: ${mockData.attack}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${mockData.type}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Resistance: ${mockData.resist}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Weakness: ${mockData.weak}`)).toBeInTheDocument();
  });

  it('should not render Resistance if resist is empty', () => {
    const dataWithoutResist = { ...mockData, resist: '' };
    render(<CardPreview data={dataWithoutResist} />);

    expect(screen.queryByText(/Resistance:/)).not.toBeInTheDocument();
  });

  it('should not render Weakness if weak is empty', () => {
    const dataWithoutWeak = { ...mockData, weak: '' };
    render(<CardPreview data={dataWithoutWeak} />);

    expect(screen.queryByText(/Weakness:/)).not.toBeInTheDocument();
  });
});
