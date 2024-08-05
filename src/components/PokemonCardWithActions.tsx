import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardActions, CardMedia, IconButton } from '@mui/material';
import placeholderImage from 'assets/placeholder_image.png';
import { PokemonCard } from 'pages/AddCard/types';

interface PokemonCardWithActionsProps {
  card: PokemonCard;
  handleEditCard: (id: string) => void;
  setDeleteModalOpen: (open: boolean) => void;
  setCardForDeleteId: (id: string) => void;
}

export const PokemonCardWithActions = ({
  card,
  handleEditCard,
  setDeleteModalOpen,
  setCardForDeleteId,
}: PokemonCardWithActionsProps) => {
  return (
    <Card key={card.id} sx={{ backgroundColor: 'transparent' }}>
      <CardMedia
        component="img"
        image={card.image}
        alt={card.name}
        onError={e => {
          e.currentTarget.src = placeholderImage;
        }}
        sx={{ height: '342px', width: '245px' }}
      />
      <CardActions sx={{ padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <IconButton
            aria-label="edit"
            onClick={() => handleEditCard(card.id || '')}
            sx={{
              flexBasis: '50%',
              borderRadius: 0,
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setDeleteModalOpen(true), setCardForDeleteId(card.id || '');
            }}
            sx={{
              flexBasis: '50%',
              borderRadius: 0,
              height: '100%',
              width: '100%',
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
