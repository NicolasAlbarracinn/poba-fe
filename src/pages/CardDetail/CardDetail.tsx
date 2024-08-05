import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CardForm } from 'components/CardForm';
import Loader from 'components/Loader';
import StyledPageBox from 'components/StyledPageBox';
import StyledPagePaper from 'components/StyledPagePaper';
import useValidateForm from 'hooks/useValidateForm';
import { isEmpty } from 'lodash-es';
import { PokemonCard } from 'pages/AddCard/types';
import { useCardDetailSlice } from './store';
import {
  selectCardDetails,
  selectIsCardLoading,
  selectLoadingCardUpdate,
} from './store/selectors';

const CardDetail = () => {
  const dispatch = useDispatch();
  const cardDetails = useSelector(selectCardDetails);
  const cardLoading = useSelector(selectIsCardLoading);
  const loadingCardUpdate = useSelector(selectLoadingCardUpdate);
  const { actions } = useCardDetailSlice();
  const { id } = useParams();
  const [formData, setFormData] = useState<PokemonCard>(cardDetails);
  const { errors, validateForm } = useValidateForm();

  useEffect(() => {
    if (id) {
      dispatch(actions.getCardRequest(id));
    }
  }, [actions, dispatch, id]);

  useEffect(() => {
    if (!isEmpty(cardDetails)) {
      setFormData(cardDetails);
    }
  }, [actions, cardDetails, dispatch, id]);

  const handleChange = (name: string, value: string | number) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(formData)) {
      dispatch(actions.updateCardRequest(formData));
    }
  };

  return (
    <StyledPageBox>
      <StyledPagePaper>
        {cardLoading ? (
          <Loader />
        ) : (
          <CardForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            formTitle="Update Card"
            submitLabel="Update Card"
            submitDisable={loadingCardUpdate}
          />
        )}
      </StyledPagePaper>
    </StyledPageBox>
  );
};

export default CardDetail;
