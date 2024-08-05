import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { CardPreview } from 'components/CardPreview';
import { PokemonCardThumbnail } from 'components/PokemonCardThumbnail/PokemonCardThumbnail';
import {
  battleButtonStyles,
  cardBattleSectionStyles,
  closeButtonStyles,
  containerStyles,
  dialogContainerStyles,
  dialogContentStyles,
  dialogPaperStyles,
  stackStyles,
  vsTextStyles,
} from './CardBattleStyles';
import { useCardBattleSlice } from './store';

export const CardBattle = ({
  cardToBattle,
  setCardToBattle,
  cardToBattleAgainst,
  setCardToBattleAgainst,
}) => {
  const { actions } = useCardBattleSlice();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePreviewBattle = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const createCardBattle = () => {
    dispatch(
      actions.createCardBattleRequest({
        cardChosenId: cardToBattle.id,
        cardAgainstId: cardToBattleAgainst.id,
      }),
    );
  };

  return (
    <Box sx={containerStyles}>
      {cardToBattle.id !== '' && cardToBattleAgainst.id !== '' ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviewBattle}
        >
          Preview Battle
        </Button>
      ) : (
        <Typography variant="h6">
          {cardToBattle.id === ''
            ? `Pick a card to battle`
            : `Pick a card to battle against`}
        </Typography>
      )}
      {(cardToBattle.id !== '' || cardToBattleAgainst.id !== '') && (
        <Box sx={cardBattleSectionStyles}>
          <PokemonCardThumbnail card={cardToBattle} setCard={setCardToBattle} />
          <Typography variant="h6">VS</Typography>
          <PokemonCardThumbnail
            card={cardToBattleAgainst}
            setCard={setCardToBattleAgainst}
          />
        </Box>
      )}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: dialogPaperStyles,
        }}
        sx={dialogContainerStyles}
      >
        <Box sx={dialogContentStyles}>
          <IconButton onClick={handleCloseModal} sx={closeButtonStyles}>
            <CloseIcon />
          </IconButton>
          <Stack sx={stackStyles}>
            <CardPreview data={cardToBattle} />
            <Typography variant="h2" sx={vsTextStyles}>
              VS
            </Typography>
            <CardPreview data={cardToBattleAgainst} />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={createCardBattle}
            sx={battleButtonStyles}
          >
            Battle Now!
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};
