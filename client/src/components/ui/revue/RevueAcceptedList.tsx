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
import {
  getRevuesThunk,
  getSortedByABSDateRevuesThunk,
  getSortedByABSRatingRevuesThunk,
  getSortedByDESCDateRevuesThunk,
  getSortedByDESCRatingRevuesThunk,
} from '../../../redux/slices/revue/RevueThunks';
import RevueCard from './RevueCard';
import type { RevueType } from '../../../types/revueTypes';

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
  const [option, setOption] = React.useState(1);
  const revues = useAppSelector((store) => store.revues);
  const [sortedRevues, setSortedRevues] = useState<RevueType[]>(revues);

  const dispatch = useAppDispatch();
  const obj = JSON.parse(JSON.stringify(revues));

  useEffect(() => {
    void dispatch(getRevuesThunk()).then((data) => {
      setSortedRevues(data.payload);
    });
  }, []);

  const user = useAppSelector((store) => store.user);
  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    switch (option) {
      case 1:
        setSortedRevues(obj.sort((a, b) => a.rating - b.rating));
        break;
      case 2:
        setSortedRevues(obj.sort((a, b) => b.rating - a.rating));

        break;

      default:
        break;
    }
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
              <MenuItem value={1}>Сначала положительные</MenuItem>
              <MenuItem value={2}>Сначала отрицательные</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {sortedRevues?.map((revue) =>
          revue.status ? <RevueCard key={revue.id} revue={revue} user={user} /> : null,
        )}
      </Container>
    </Box>
  );
}
