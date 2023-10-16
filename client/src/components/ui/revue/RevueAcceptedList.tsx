import React, { useEffect, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import {
  Autocomplete,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  createFilterOptions,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getRevuesThunk } from '../../../redux/slices/revue/RevueThunks';
import RevueCard from './RevueCard';

const options = [
  { title: 'Сначала положительные' },
  { title: 'Сначала отрицательные' },
  { title: 'Сначала новые' },
  { title: 'Сначала старые' },
];

type FilterOptionType = {
  title: string;
};
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: FilterOptionType) => option.title,
});
export default function RevueAcceptedList(): JSX.Element {
  const [option, setOption] = React.useState('');
  const revues = useAppSelector((store) => store.revues);
  // const [sortedRevues,setSortedRevues] = useState(revue)

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getRevuesThunk());
   
   
  }, []);

  const user = useAppSelector((store) => store.user);
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setOption(event.target.value);
  };
  return (
    <Box mt={5}>
      <Container>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Показать</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="Сначала новые">Сначала новые</MenuItem>
              <MenuItem value="Сначала старые">Сначала старые</MenuItem>
              <MenuItem value="Сначала положительные">Сначала положительные</MenuItem>
              <MenuItem value="Сначала отрицательные">Сначала отрицательные</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {revues?.map((revue) =>
          revue.status ? <RevueCard key={revue.id} revue={revue} user={user} /> : null,
        )}
      </Container>
    </Box>
  );
}
