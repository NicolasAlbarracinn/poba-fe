import { ReactNode, useMemo } from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { customTheme } from './theme';

// Define the props type
type ThemeProviderProps = {
  children: ReactNode;
};

// Convert to const component
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useMemo(() => extendTheme(customTheme), []);

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      {children}
    </CssVarsProvider>
  );
};

export default ThemeProvider;