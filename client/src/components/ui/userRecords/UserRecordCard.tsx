/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
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

type BookCardPropsType = {
  userRecord: UserRecordType;
  user: UserLoadingType;
};

function UserRecordCard({ userRecord, user }: BookCardPropsType): JSX.Element {
  console.log(userRecord);

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Дата: {userRecord.date} октября
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Время: {userRecord.time}:00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Мастер: {userRecord.Master.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Услуга: {userRecord.Service.name}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default memo(UserRecordCard);
