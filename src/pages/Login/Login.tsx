import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { appActions } from 'containers/App/appSlice';
import { selectAppUser } from 'containers/App/selectors';
import { isEmpty } from 'lodash-es';
import { boxStyles, cardContentStyles, cardStyles } from './LoginStyles';
import { useLoginSlice } from './store';

const Login = () => {
  const { actions } = useLoginSlice();
  const isLogged = useSelector(selectAppUser);
  const dispatch = useDispatch();

  const handleLoginSuccess = (response: CredentialResponse) => {
    dispatch(
      actions.getLoginRequest({ credential: response.credential || '' }),
    );
    dispatch(appActions.setToken(response.credential || ''));
  };

  const handleLoginFailure = () => {};

  if (!isEmpty(isLogged)) {
    return <Navigate to="/card-list" />;
  }

  return (
    <Box sx={boxStyles}>
      <Card sx={cardStyles}>
        <CardContent sx={cardContentStyles}>
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome
          </Typography>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
