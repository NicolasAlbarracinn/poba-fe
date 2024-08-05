import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export const boxStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const cardStyles: SxProps<Theme> = {
  height: '150px',
  width: '250px',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  '.MuiCardContent-root': {
    padding: 0,
    paddingBottom: '20px',
  },
};

export const cardContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  textAlign: 'center',
};
