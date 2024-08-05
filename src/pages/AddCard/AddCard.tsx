import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardForm } from 'components/CardForm';
import StyledPageBox from 'components/styled/StyledPageBox';
import StyledPagePaper from 'components/styled/StyledPagePaper';
import useValidateForm from 'hooks/useValidateForm';
import { PokemonCard } from 'interfaces/cards';
import { selectIsLoading } from 'pages/Login/store/selectors';
import { PokemonCardDefault } from 'utils/constants';
import { useCreateCardSlice } from './store';

const AddCard = () => {
  const isLoading = useSelector(selectIsLoading);
  const { actions } = useCreateCardSlice();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<PokemonCard>(PokemonCardDefault);
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
