import * as React from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Autocomplete } from 'components/Autocomplete';
import { pokemonTypes } from 'mocks/pokemonData';
import { CardOption } from '../CardList';

interface SearchBarProps {
  searchOptions: CardOption[];
  expansion: string;
  expansions: string[];
  type: string;
  setExpansion: (value: string) => void;
  setType: (value: string) => void;
  setPage: (page: number) => void;
  setSearchName: (name: string) => void;
  setSelectedCard: (id: string | null) => void;
}

export const SearchBar = ({
  searchOptions,
  expansion,
  expansions,
  type,
  setExpansion,
  setType,
  setPage,
  setSearchName,
  setSelectedCard,
}: SearchBarProps) => {
  const handleExpansionChange = (e: SelectChangeEvent<string>) => {
    setExpansion(e.target.value);
    setPage(1);
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(e.target.value);
    setPage(1);
  };

  const handleInputChange = (_e: React.ChangeEvent<{}>, value: string) => {
    setSearchName(value);
  };

  const handleSearchChange = (
    _e: React.ChangeEvent<{}>,
    value: CardOption | null,
  ) => {
    setSelectedCard(value?.id || null);
  };
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            searchOptions={searchOptions}
            handleInputChange={handleInputChange}
            handleSearchChange={handleSearchChange}
            label="Search by Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl size="small" variant="outlined" fullWidth>
            <InputLabel>Expansion</InputLabel>
            <Select
              value={expansion}
              onChange={handleExpansionChange}
              label="Expansion"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {expansions.map(expansion => (
                <MenuItem key={expansion} value={expansion}>
                  {expansion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl size="small" variant="outlined" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="small"
              value={type}
              onChange={handleTypeChange}
              label="Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {pokemonTypes.map(type => (
                <MenuItem key={type.key} value={type.value}>
                  {type.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
