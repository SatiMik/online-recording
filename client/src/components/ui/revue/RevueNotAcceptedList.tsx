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
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #F5F5F5',
      }}
    >
      <Container>
        <Typography
          style={{ margin: '20px', fontWeight: 'bold', fontSize: '20px', color: '#566F5F' }}
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
