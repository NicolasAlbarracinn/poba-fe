import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination as MuiPagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (value: number) => void;
  cardsPerPage: number;
  handleCardsPerPageChange: (value: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  handlePageChange,
  cardsPerPage,
  handleCardsPerPageChange,
}: PaginationProps) => {
  return (
    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          marginTop: 2,
          flexDirection: 'row',
        }}
      >
        <Typography>
          Page {page} of {totalPages}
        </Typography>
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            handlePageChange(value)
          }
          showFirstButton
          showLastButton
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="cards-per-page-label">Cards per Page</InputLabel>
          <Select
            labelId="cards-per-page-label"
            value={cardsPerPage}
            onChange={(e: SelectChangeEvent<number>) =>
              handleCardsPerPageChange(Number(e.target.value))
            }
            label="Cards per Page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
