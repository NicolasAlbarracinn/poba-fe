import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import StyledPageBox from 'components/StyledPageBox';
import StyledPagePaper from 'components/StyledPagePaper';
import { AddCardForm } from './components/AddCardForm';
import { useCreateCardSlice } from './store';
import { Errors, PokemonCard } from './types';

const initialErrors: Errors = {
  cardCode: '',
  expansion: '',
  name: '',
  image: '',
  hp: '',
  attack: '',
  type: '',
};

const AddCard = () => {
  const { actions } = useCreateCardSlice();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<PokemonCard>({
    cardCode: '',
    expansion: '',
    name: '',
    image: '',
    hp: 0,
    attack: 0,
    type: '',
    resist: '',
    weak: '',
  });
  const [errors, setErrors] = useState(initialErrors);

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.expansion) newErrors.expansion = 'Expansion is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    if (formData.hp <= 0) newErrors.hp = 'HP must be greater than 0';
    if (formData.attack <= 0)
      newErrors.attack = 'Attack must be greater than 0';
    if (!formData.type) newErrors.type = 'Type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(actions.createCardRequest(formData));
    }
  };

  return (
    <StyledPageBox>
      <StyledPagePaper>
        <AddCardForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          errors={errors}
        />
      </StyledPagePaper>
    </StyledPageBox>
  );
};

export default AddCard;
