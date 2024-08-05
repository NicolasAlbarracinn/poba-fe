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

  const handleGoToPath = (url: string) => {
    navigate(url);
  };

  return (
    <MuiAppBar position="static">
      <Toolbar sx={toolbarStyles}>
        <Box sx={boxStyles}>
          <Typography variant="h6">Pokemon Battler</Typography>
          <Button onClick={() => handleGoToPath('/add-card')} sx={buttonStyles}>
            Add Card
          </Button>
          <Button
            onClick={() => handleGoToPath('/card-list')}
            sx={buttonStyles}
          >
            Card List
          </Button>
        </Box>
        <ThemeSwitchButton />
      </Toolbar>
    </MuiAppBar>
  );
};
