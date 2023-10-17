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

type BookCardPropsType = {
  userRecord: UserRecordType;
  user: UserLoadingType;
};

function UserRecordCard({ userRecord, user }: BookCardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);


  return (
    
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Дата: {userRecord?.date} октября
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Время: {userRecord?.time}:00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Мастер: {userRecord?.Master.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Услуга: {userRecord?.Service.name}
            </Typography>
            <Button onClick={() => setOpen(true)} size="small">
              Отменить запись
            </Button>
            {open&&<UserRecordModal open={open} setOpen={setOpen} userRecord={userRecord} user={user}/>}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default memo(UserRecordCard);
