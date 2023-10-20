/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import React, { memo, useState } from 'react';
import type { UserRecordType } from '../../../types/userRecordTypes';
import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteUserRecordThunk } from '../../../redux/slices/userRecords/UserRecordsThunks';
import UserRecordModal from './UserRecordModal';
import dayjs from 'dayjs';

type BookCardPropsType = {
  userRecord: UserRecordType;
  user: UserLoadingType;
};

function UserRecordCard({ userRecord, user }: BookCardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);



  return (
    <Box style={{ width: '100%' }}>
      <Container>
        <Card sx={{ maxWidth: '80%' }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="#566F5F"
              style={{ fontWeight: 'bold' }}
            >
              {`${userRecord?.date.toLocaleString().slice(0, 10)} `}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="#566F5F"
              style={{ fontWeight: 'bold', marginTop: '-10px' }}
            >
              {userRecord?.time % 100
                ? `${Math.floor(userRecord?.time / 100)}:30`
                : `${Math.floor(userRecord?.time / 100)}:00`}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Мастер: {userRecord?.Master.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Услуга: {userRecord?.Service.name}
            </Typography>
            <Button
              style={{ marginTop: '20px', backgroundColor: '#566F5F', color: 'white' }}
              onClick={() => setOpen(true)}
              size="small"
            >
              Отменить запись
            </Button>
            {open && (
              <UserRecordModal open={open} setOpen={setOpen} userRecord={userRecord} user={user} />
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default memo(UserRecordCard);
