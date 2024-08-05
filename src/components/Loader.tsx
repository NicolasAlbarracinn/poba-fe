import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loader = () => (
  <Backdrop open={true} style={{ zIndex: 1000 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loader;
