import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { PokemonCardThumbnail } from 'components/PokemonCardThumbnail/PokemonCardThumbnail';
import { PokemonCardDefault } from 'utils/constants';

const mockCard = {
  image: 'https://via.placeholder.com/150/0000FF/808080 ?Text=PAKAINFO.com',
  name: 'Pikachu',
  id: '1',
};

describe('PokemonCardThumbnail Component', () => {
  it('should render the component with the provided card image', () => {
    render(<PokemonCardThumbnail card={mockCard} setCard={vi.fn()} />);

    const imgElement = screen.getByAltText('No card selected');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockCard.image);
  });

  it('should call setCard with default value when close clicked', () => {
    const setCardMock = vi.fn();
    render(<PokemonCardThumbnail card={mockCard} setCard={setCardMock} />);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(setCardMock).toHaveBeenCalledWith(PokemonCardDefault);
  });
});
