import { useState } from 'react';
import { PokemonCard } from 'interfaces/cards';

export interface Errors {
  name?: string;
  expansion?: string;
  image?: string;
  hp?: string;
  attack?: string;
  type?: string;
  cardCode?: string;
}

const useValidateForm = () => {
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (formData: PokemonCard) => {
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

  return { errors, validateForm };
};

export default useValidateForm;
