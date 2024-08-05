import React from 'react';
import { Box } from '@mui/material';
import { PokemonCardDefault } from 'utils/constants';
import {
  closeButtonStyles,
  imageStyles,
  thumbnailWrapperStyles,
} from './PokemonCardThumbnailStyles';

export const PokemonCardThumbnail = ({ card, setCard }) => {
  return (
    <Box sx={thumbnailWrapperStyles(card)}>
      <Box
        component="img"
        src={card.image}
        alt="No card selected"
        sx={imageStyles}
      />
      <Box
        className="close-button"
        sx={closeButtonStyles}
        onClick={() => {
          setCard(PokemonCardDefault);
        }}
      >
        X
      </Box>
    </Box>
  );
};
