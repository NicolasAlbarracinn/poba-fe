import { SxProps, Theme } from '@mui/material';

export const toolbarStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
};

export const boxStyles: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
};

export const buttonStyles: SxProps<Theme> = {
  color: 'inherit',
  marginLeft: 2,
  textDecoration: 'none',
  marginRight: 2,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textDecoration: 'none',
  },
};
