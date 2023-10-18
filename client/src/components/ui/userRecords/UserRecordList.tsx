import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUserRecordsThunk } from '../../../redux/slices/userRecords/UserRecordsThunks';
import UserRecordCard from './UserRecordCard';

export default function UserRecordList(): JSX.Element {
  const userRecords = useAppSelector((store) => store.userRecords);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUserRecordsThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
    <Box mt={5}>
      <Container>
        <h2>Ваши записи:</h2>
        {!userRecords.length ? (
          <h3>У вас еще нет ни одной записи</h3>
        ) : (
          userRecords?.map((userRecord) => (
            <UserRecordCard key={userRecord.id} userRecord={userRecord} user={user} />
          ))
        )}
      </Container>
    </Box>
  );
}
