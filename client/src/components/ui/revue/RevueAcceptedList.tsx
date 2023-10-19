import React, { useEffect } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Box, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getRevuesThunk } from '../../../redux/slices/revue/RevueThunks';
import RevueCard from './RevueCard';
import { sortHigh, sortLow } from '../../../redux/slices/revue/RevueSlice';

export default function RevueAcceptedList(): JSX.Element {
  const [option, setOption] = React.useState('0');
  const revues = useAppSelector((store) => store.revues);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getRevuesThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  const handleChange = (event: SelectChangeEvent) => {
    setOption((prev) => event.target.value);e
    switch (event.target.value) {
      case '1':
        dispatch(sortHigh());

        break;
      case '2':
        dispatch(sortLow());

        break;

      default:
        break;
    }
  };

  return (
    <Box mt={5}>
      <Container>
        <Box sx={{ minWidth: 120, marginBottom: '16px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Показать</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option}
              label="Age"
              onChange={handleChange}
              defaultValue="0"
            >
              <MenuItem value="0">Фильтр</MenuItem>
              <MenuItem value="1">Сначала положительные</MenuItem>

              <MenuItem value="2">Сначала отрицательные</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {revues?.map(
            (revue) =>
              revue.status && (
                <Box key={revue.id} sx={{ width: '100%' }}>
                  <RevueCard revue={revue} user={user} />
                </Box>
              ),
          )}
        </Box>
      </Container>
    </Box>
  );
}
