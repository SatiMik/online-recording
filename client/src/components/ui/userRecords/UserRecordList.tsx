import React, { useEffect } from 'react';
import { Box, Button, Container, Typography, Link } from '@mui/material';

import { Link as NavLink } from 'react-router-dom';
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
        <Typography
          style={{
            margin: '20px',
            fontWeight: 'bold',
            fontSize: '27px',
            color: '#566F5F',
            padding: '20px',
          }}
        >
          Ваши записи:
        </Typography>
        {!userRecords.length ? (
          <>
            <Typography
              style={{ margin: '20px', fontSize: '20px', color: 'black', padding: '20px' }}
            >
              У вас пока нет ни одной записи
            </Typography>
            <Button
              style={{
                backgroundColor: '#566F5F',
                margin: '20px',
                marginLeft: '40px',
                height: '50px',
                width: '200px',
              }}
            >
              <Link
                style={{ color: 'white' }}
                key="Записаться"
                component={NavLink}
                to="/online-record"
              >
                Записаться
              </Link>
            </Button>
          </>
        ) : (
          userRecords?.map((userRecord) => (
            <UserRecordCard key={userRecord.id} userRecord={userRecord} user={user} />
          ))
        )}
      </Container>
    </Box>
  );
}
