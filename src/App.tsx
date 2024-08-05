import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import bgImage from 'assets/pokemon-background.jpg';
import { AppBar } from 'containers/AppBar/AppBar';
import PrivateRoute from 'containers/PrivateRoutes/PrivateRoutes';
import AddCard from 'pages/AddCard/AddCard';
import CardDetail from 'pages/CardDetail/CardDetail';
import CardList from 'pages/CardList/CardList';
import Login from 'pages/Login/Login';

const App = () => {
  return (
    <>
      <AppBar />
      <Box
        style={{
          backgroundImage: `url(${bgImage})`, // Use URL string here
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="add-card" element={<AddCard />} />
            <Route path="card-list" element={<CardList />} />
            <Route path="card-detail/:id" element={<CardDetail />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
};

export default App;
