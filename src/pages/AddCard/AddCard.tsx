import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardForm } from 'components/CardForm';
import StyledPageBox from 'components/StyledPageBox';
import StyledPagePaper from 'components/StyledPagePaper';
import useValidateForm from 'hooks/useValidateForm';
import { selectIsLoading } from 'pages/Login/store/selectors';
import { initialCardForm } from 'utils/constants';
import { useCreateCardSlice } from './store';
import { PokemonCard } from './types';

const AddCard = () => {
  const isLoading = useSelector(selectIsLoading);
  const { actions } = useCreateCardSlice();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<PokemonCard>(initialCardForm);
  const { errors, validateForm } = useValidateForm();

  const handleChange = (name: string, value: string | number) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(formData)) {
      dispatch(actions.createCardRequest(formData));
    }
  };

  return (
    <StyledPageBox>
      <StyledPagePaper>
        <CardForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          errors={errors}
          formTitle="Create Card"
          submitDisable={isLoading}
        />
      </StyledPagePaper>
    </StyledPageBox>
  );
};

export default AddCard;
