import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export const GoBackButton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="contained"
      onClick={handleGoBack}
      startIcon={<ArrowBackIcon />}
      sx={{
        position: 'absolute',
        top: 3,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: 'black',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
      }}
    >
      Go Back
    </Button>
  );
};
