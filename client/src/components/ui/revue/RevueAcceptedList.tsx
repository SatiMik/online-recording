import React, { useEffect } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Box, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  getRevuesThunk,
  getSortedByABSDateRevuesThunk,
  getSortedByDESCDateRevuesThunk,
} from '../../../redux/slices/revue/RevueThunks';
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
    setOption((prev) => event.target.value);
    switch (event.target.value) {
      case '1':
        // void dispatch(getSortedByABSDateRevuesThunk());
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
              <MenuItem value="0">Выберите значение</MenuItem>
              <MenuItem value="1">Сначала положительные</MenuItem>

              <MenuItem value="2">Сначала отрицательные</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {revues?.map((revue) =>
            revue.status ? <RevueCard key={revue.id} revue={revue} user={user} /> : null,
          )}
        </Box>
      </Container>
    </Box>
  );
}
