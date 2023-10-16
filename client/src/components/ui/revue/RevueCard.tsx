/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { memo, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box, Container } from '@mui/material';

import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch } from '../../../redux/hooks';
import type { RevueType } from '../../../types/revueTypes';
import { deleteRevueThunk } from '../../../redux/slices/revue/RevueThunks';
import RevueModal from './RevueModal';

type RevueCardPropsType = {
  revue: RevueType;
  user: UserLoadingType;
};

// сделать личный кабинет с отзывами и записями, прикрутить оценку к отзыву и дату

function RevueCard({ revue, user }: RevueCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  console.log(user, '------', revue);

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {revue.User?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {revue.text}
            </Typography>
          </CardContent>
          <CardActions>
            {((user.status === 'logged' && user.isAdmin) ||
              (user.status === 'logged' && user.id === revue.userId)) && (
              <>
                <Button
                  onClick={() => void dispatch(deleteRevueThunk({ id: revue.id }))}
                  size="small"
                >
                  Удалить
                </Button>
                {user.status === 'logged' && user.id === revue.userId && (
                  <Button onClick={() => setOpen(true)} size="small">
                    Редактировать
                  </Button>
                )}
              </>
            )}
          </CardActions>
          {open && <RevueModal open={open} revue={revue} setOpen={setOpen} />}
        </Card>
      </Container>
    </Box>
  );
}

export default memo(RevueCard);
