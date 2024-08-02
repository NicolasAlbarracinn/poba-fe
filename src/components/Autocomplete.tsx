import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';

// Could be a generic type for reause
interface OptionType {
  id: string;
  name: string;
  cardCode: string;
}

interface AutocompleteProps {
  searchOptions: OptionType[];
  handleInputChange: (event: React.SyntheticEvent, value: string) => void;
  handleSearchChange: (
    event: React.SyntheticEvent,
    value: OptionType | null,
  ) => void;
  label: string;
}

export const Autocomplete = ({
  searchOptions,
  handleInputChange,
  handleSearchChange,
  label,
}: AutocompleteProps) => {
  return (
    <MuiAutocomplete
      options={searchOptions}
      getOptionLabel={option => `${option.name} - ${option.cardCode}`}
      onInputChange={handleInputChange}
      onChange={handleSearchChange}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" size="small" />
      )}
    />
  );
};
