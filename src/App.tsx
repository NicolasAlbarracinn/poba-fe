import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import bgImage from 'assets/pokemon-background.jpg';
import { AppBar } from 'containers/AppBar/AppBar';
import PrivateRoute from 'containers/PrivateRoutes/PrivateRoutes';
import AddCard from 'pages/AddCard/AddCard';
import CardList from 'pages/CardList/CardList';
import Login from 'pages/Login/Login';

// Adjust path if necessary

const App = () => {
  return (
    <>
      <AppBar />
      <Box
        style={{
          height: '100vh',
          backgroundImage: `url(${bgImage})`, // Use URL string here
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="add-card" element={<AddCard />} />
            <Route path="card-list" element={<CardList />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
};

export default App;
