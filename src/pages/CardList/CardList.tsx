import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardMedia } from '@mui/material';
import { Pagination } from 'components/Pagination';
import StyledPageBox from 'components/StyledPageBox';
import StyledPagePaper from 'components/StyledPagePaper';
import { SearchBar } from './components/SearchBar';
import { useCardsListSlice } from './store';
import {
  selectCards,
  selectExpansions,
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
  const cards = useSelector(selectCards);
  const totalCards = useSelector(selectTotalCards);
  const expansions = useSelector(selectExpansions);
  const searchOptions = useSelector(selectSearchOptions) as CardOption[]; // Ensure correct typing
  const { actions } = useCardsListSlice();
  const [searchName, setSearchName] = useState('');
  const [expansion, setExpansion] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  useEffect(() => {
    dispatch(actions.getCardsExpansionsRequest());
  }, [actions, dispatch]);

  useEffect(() => {
    dispatch(actions.getSearchOptionsRequest(searchName));
  }, [actions, dispatch, searchName]);

  useEffect(() => {
    dispatch(
      actions.getCardsRequest({
        page,
        amount: cardsPerPage,
        type,
        expansion,
      }),
    );
  }, [actions, cardsPerPage, dispatch, expansion, page, type]);

  const handleCardsPerPageChange = (value: number) => {
    setCardsPerPage(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
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
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {cards.map(card => (
            <Card key={card.id} sx={{ maxWidth: 200 }}>
              <CardMedia component="img" image={card.image} alt={card.name} />
            </Card>
          ))}
        </Box>
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          cardsPerPage={cardsPerPage}
          handleCardsPerPageChange={handleCardsPerPageChange}
        />
      </StyledPagePaper>
    </StyledPageBox>
  );
};

export default CardList;
