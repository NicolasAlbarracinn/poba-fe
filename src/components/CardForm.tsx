import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Errors } from 'hooks/useValidateForm';
import { PokemonCard } from 'interfaces/cards';
import { pokemonTypes } from 'mocks/pokemonData';
import { CardPreview } from './CardPreview';
import { GoBackButton } from './GoBackButton';

interface IAddCardFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (name: string, value: string | number) => void;
  formData: PokemonCard;
  errors: Errors;
  formTitle: string;
  submitLabel?: string;
  submitDisable?: boolean;
}

export const CardForm = (props: IAddCardFormProps) => {
  const {
    handleSubmit,
    handleChange,
    formData,
    errors,
    formTitle,
    submitLabel,
    submitDisable = false,
  } = props;

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    handleChange(name, type === 'number' ? +value : value);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" position="relative">
        <Typography variant="h4" gutterBottom>
          {formTitle}
        </Typography>
        <GoBackButton />
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12} sx={{ textAlign: 'center' }}>
            <CardPreview data={formData} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleTextFieldChange}
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Expansion"
                  name="expansion"
                  id="expansion"
                  value={formData.expansion}
                  onChange={handleTextFieldChange}
                  size="small"
                  error={!!errors.expansion}
                  helperText={errors.expansion}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Card code"
                  name="cardCode"
                  id="cardCode"
                  value={formData.cardCode}
                  onChange={handleTextFieldChange}
                  size="small"
                  error={!!errors.cardCode}
                  helperText={errors.cardCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Image URL"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleTextFieldChange}
                  size="small"
                  error={!!errors.image}
                  helperText={errors.image}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  label="HP"
                  name="hp"
                  id="hp"
                  type="number"
                  value={formData.hp}
                  onChange={handleTextFieldChange}
                  size="small"
                  error={!!errors.hp}
                  helperText={errors.hp}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  label="Attack"
                  name="attack"
                  id="attack"
                  type="number"
                  value={formData.attack}
                  onChange={handleTextFieldChange}
                  size="small"
                  error={!!errors.attack}
                  helperText={errors.attack}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl size="small" fullWidth error={!!errors.type}>
                  <InputLabel id="type-label">Type *</InputLabel>
                  <Select
                    name="type"
                    labelId="type-label"
                    id="type"
                    label="Type"
                    value={formData.type}
                    onChange={handleSelectChange}
                    size="small"
                  >
                    {pokemonTypes.map(type => (
                      <MenuItem key={type.key} value={type.value}>
                        {type.value}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.type && (
                    <FormHelperText>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="resist-label">Resistance</InputLabel>
                  <Select
                    name="resist"
                    labelId="resist-label"
                    id="resist"
                    label="Resistance"
                    value={formData.resist}
                    onChange={handleSelectChange}
                    size="small"
                  >
                    {pokemonTypes.map(type => (
                      <MenuItem key={type.key} value={type.value}>
                        {type.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="weak-label">Weakness</InputLabel>
                  <Select
                    name="weak"
                    labelId="weak-label"
                    id="weak"
                    label="Weakness"
                    value={formData.weak}
                    onChange={handleSelectChange}
                    size="small"
                  >
                    {pokemonTypes.map(type => (
                      <MenuItem key={type.key} value={type.value}>
                        {type.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  size="small"
                  disabled={submitDisable}
                >
                  {submitLabel || 'Add Card'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
