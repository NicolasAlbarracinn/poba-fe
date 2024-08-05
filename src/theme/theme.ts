import { blue } from '@mui/material/colors';

export const customTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[600],
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#121212',
        },
        primary: {
          main: '#90caf9',
        },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100vh',
        },
      },
    },
  },
};
