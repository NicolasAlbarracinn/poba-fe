import { Box, Typography } from '@mui/material';
import placeholderImage from 'assets/placeholder_image.png';
import { PokemonCard } from 'interfaces/cards';

interface CardPrevieProps {
  data: PokemonCard;
}

export const CardPreview = ({ data }: CardPrevieProps) => {
  return (
    <Box>
      <Box
        component="img"
        src={data.image}
        alt={data.name}
        onError={e => {
          e.currentTarget.src = placeholderImage;
        }}
        sx={{
          width: 245,
          height: 342,
          objectFit: 'cover',
        }}
      />
      <Box>
        <Typography variant="subtitle2">Hp: {data.hp}</Typography>
        <Typography variant="subtitle2">Attack: {data.attack}</Typography>
        <Typography variant="subtitle2">Type: {data.type}</Typography>
        {data.resist !== '' && (
          <Typography variant="subtitle2">Resistance: {data.resist}</Typography>
        )}
        {data.weak !== '' && (
          <Typography variant="subtitle2">Weakness: {data.weak}</Typography>
        )}
      </Box>
    </Box>
  );
};
