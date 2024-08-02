import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import ThemeSwitchButton from 'theme/switch-theme-button';
import { boxStyles, buttonStyles, toolbarStyles } from './AppBarStyles';

export const AppBar = () => {
  const navigate = useNavigate();

  const handleAddCardClick = () => {
    navigate('/add-card');
  };

  return (
    <MuiAppBar position="static">
      <Toolbar sx={toolbarStyles}>
        <Box sx={boxStyles}>
          <Typography variant="h6">Pokemon Battler</Typography>
          <Button onClick={handleAddCardClick} sx={buttonStyles}>
            Add Card
          </Button>
        </Box>
        <ThemeSwitchButton />
      </Toolbar>
    </MuiAppBar>
  );
};
