import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ConfirmationDialog from 'components/ConfirmationDialog';
import Loader from 'components/Loader';
import { Pagination } from 'components/Pagination';
import StyledPageBox from 'components/styled/StyledPageBox';
import StyledPagePaper from 'components/styled/StyledPagePaper';
import { CardBattle } from 'pages/CardBattle/CardBattle';
import { PokemonCardDefault } from 'utils/constants';
import { PokemonCardWithActions } from './components/PokemonCardWithActions';
import { SearchBar } from './components/SearchBar';
import { useCardsListSlice } from './store';
import {
  selectCards,
  selectExpansions,
  selectIsLoadingCards,
  selectRefetch,
  selectSearchOptions,
  selectTotalCards,
} from './store/selectors';

export interface CardOption {
  id: string;
  name: string;
  cardCode: string;
}

const CardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector(selectCards);
  const totalCards = useSelector(selectTotalCards);
  const expansions = useSelector(selectExpansions);
  const isLoading = useSelector(selectIsLoadingCards);
  const refetch = useSelector(selectRefetch);
  const searchOptions = useSelector(selectSearchOptions) as CardOption[];
  const { actions } = useCardsListSlice();
  const [searchName, setSearchName] = useState('');
  const [expansion, setExpansion] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [cardToBattle, setCardToBattle] = useState(PokemonCardDefault);
  const [cardToBattleAgainst, setCardToBattleAgainst] =
    useState(PokemonCardDefault);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardForDelete, setCardForDeleteId] = useState<string>('');
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  useEffect(() => {
    dispatch(actions.getCardsExpansionsRequest());
  }, [actions, dispatch]);

  useEffect(() => {
    if (searchName.length > 2) {
      dispatch(actions.getSearchOptionsRequest(searchName));
    }
  }, [actions, dispatch, searchName]);

  useEffect(() => {
    dispatch(
      actions.getCardsRequest({
        page,
        amount: cardsPerPage,
        type,
        expansion,
        cardId: selectedCard,
      }),
    );
  }, [actions, cardsPerPage, dispatch, expansion, page, selectedCard, type]);

  useEffect(() => {
    if (refetch) {
      dispatch(
        actions.getCardsRequest({
          page,
          amount: cardsPerPage,
          type,
          expansion,
          cardId: selectedCard,
        }),
      );
    }
  }, [
    actions,
    cardsPerPage,
    dispatch,
    expansion,
    page,
    refetch,
    selectedCard,
    type,
  ]);

  const handleCardsPerPageChange = (value: number) => {
    setCardsPerPage(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleEditCard = (id: string) => {
    navigate(`/card-detail/${id}`);
  };

  const handleDeleteCard = (id: string) => {
    dispatch(actions.removeCardRequest(id));
  };

  return (
    <>
      <StyledPageBox>
        <StyledPagePaper>
          <SearchBar
            searchOptions={searchOptions}
            expansion={expansion}
            expansions={expansions}
            type={type}
            setExpansion={setExpansion}
            setType={setType}
            setPage={setPage}
            setSearchName={setSearchName}
            setSelectedCard={setSelectedCard}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CardBattle
                cardToBattle={cardToBattle}
                setCardToBattle={setCardToBattle}
                cardToBattleAgainst={cardToBattleAgainst}
                setCardToBattleAgainst={setCardToBattleAgainst}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                {cards.map(card => (
                  <PokemonCardWithActions
                    key={card.id}
                    card={card}
                    handleEditCard={handleEditCard}
                    setDeleteModalOpen={setDeleteModalOpen}
                    setCardForDeleteId={setCardForDeleteId}
                    cardToBattle={cardToBattle}
                    setCardToBattle={setCardToBattle}
                    cardToBattleAgainst={cardToBattleAgainst}
                    setCardToBattleAgainst={setCardToBattleAgainst}
                  />
                ))}
                <ConfirmationDialog
                  message="Are you sure you want to delete the card?"
                  open={deleteModalOpen}
                  onConfirm={() => {
                    handleDeleteCard(cardForDelete);
                    setDeleteModalOpen(false);
                  }}
                  onClose={() => setDeleteModalOpen(false)}
                />
              </Box>
            </>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            cardsPerPage={cardsPerPage}
            handleCardsPerPageChange={handleCardsPerPageChange}
          />
        </StyledPagePaper>
      </StyledPageBox>
    </>
  );
};

export default CardList;
