import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export default StyledPageBox;
