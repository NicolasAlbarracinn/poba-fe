import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4), // Uses theme spacing for padding
  backgroundColor: 'rgba(128, 128, 128, 0.7)',
  maxWidth: 1200,
  width: '80%',
  minHeight: '481px',
}));

export default StyledPaper;
