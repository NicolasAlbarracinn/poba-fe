import * as React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistor, store } from 'store/configureStore';
import ThemeProvider from 'theme/theme-provider';
import App from './App';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <ToastContainer />
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        </PersistGate>
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
