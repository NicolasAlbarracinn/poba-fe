import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardActions, CardMedia, IconButton } from '@mui/material';
import placeholderImage from 'assets/placeholder_image.png';
import { PokemonCard } from 'interfaces/cards';
import { PokemonCardDefault } from 'utils/constants';

interface PokemonCardWithActionsProps {
  card: PokemonCard;
  handleEditCard: (id: string) => void;
  setDeleteModalOpen: (open: boolean) => void;
  setCardForDeleteId: (id: string) => void;
  setCardToBattle: (card: PokemonCard) => void;
  setCardToBattleAgainst: (card: PokemonCard) => void;
  cardToBattle: PokemonCard;
  cardToBattleAgainst: PokemonCard;
}

export const PokemonCardWithActions = ({
  card,
  handleEditCard,
  setDeleteModalOpen,
  setCardForDeleteId,
  setCardToBattle,
  setCardToBattleAgainst,
  cardToBattle,
  cardToBattleAgainst,
}: PokemonCardWithActionsProps) => {
  const handleCardClick = (cardId: string) => {
    if (
      cardToBattle.id !== '' &&
      cardToBattleAgainst.id !== '' &&
      cardId !== cardToBattle.id &&
      cardId !== cardToBattleAgainst.id
    )
      return;
    if (cardId === cardToBattle.id) {
      setCardToBattle(PokemonCardDefault);
    } else if (cardId === cardToBattleAgainst.id) {
      setCardToBattleAgainst(PokemonCardDefault);
    } else if (cardToBattle.id === '') {
      setCardToBattle(card);
    } else {
      setCardToBattleAgainst(card);
    }
  };

  return (
    <Card
      key={card.id}
      sx={{
        backgroundColor: 'transparent',
        overflow: 'visible',
      }}
    >
      <CardMedia
        onClick={() => handleCardClick(card.id || '')}
        component="img"
        image={card.image}
        alt={card.name}
        onError={e => {
          e.currentTarget.src = placeholderImage;
        }}
        sx={{
          height: '342px',
          width: '245px',
          borderRadius: '10px',
          boxShadow:
            card.id === cardToBattle.id || card.id === cardToBattleAgainst.id
              ? '0 0 15px 10px rgba(150, 188, 37, 0.74)'
              : 'none',
          cursor: 'pointer',
        }}
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
              setDeleteModalOpen(true);
              setCardForDeleteId(card.id || '');
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
