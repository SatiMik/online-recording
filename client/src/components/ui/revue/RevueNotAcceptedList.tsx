import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getRevuesThunk } from '../../../redux/slices/revue/RevueThunks';
import RevueCard from './RevueCard';

export default function RevueNotAcceptedList(): JSX.Element {
  const revues = useAppSelector((store) => store.revues);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getRevuesThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
    <Box
      sx={{
        minHeight: 200,
        marginBottom: '16px',
        backgroundColor: '#566F5F'
  
 
      }}
    >
      <Container>
        <Typography
          style={{ margin: '20px', fontWeight: 'bold', fontSize: '20px', color: 'white' , padding: '20px' }}
          variant="h5"
          align="center"
        >
          Отзывы на рассмотрении:
        </Typography>
        {revues?.map((revue) =>
          !revue.status ? <RevueCard key={revue.id} revue={revue} user={user} /> : null,
        )}
      </Container>
    </Box>
  );
}
