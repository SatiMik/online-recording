import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getRevuesThunk } from '../../../redux/slices/revue/RevueThunks';
import RevueCard from './RevueCard';


export default function RevueList(): JSX.Element {
  const revues = useAppSelector((store) => store.revues);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getRevuesThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
    <Box mt={5}>
      <Container>
        {revues?.map((revue) => <RevueCard key={revue.id} revue={revue} user={user} />)}
      </Container>
    </Box>
  );
}
