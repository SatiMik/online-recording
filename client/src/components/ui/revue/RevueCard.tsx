/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { memo, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Container,
  Rating,
} from '@mui/material';

import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch } from '../../../redux/hooks';
import type { RevueType } from '../../../types/revueTypes';
import { changeStatusThunk, deleteRevueThunk } from '../../../redux/slices/revue/RevueThunks';
import RevueModal from './RevueModal';

type RevueCardPropsType = {
  revue: RevueType;
  user: UserLoadingType;
};

// сделать личный кабинет с отзывами и записями, прикрутить оценку к отзыву и дату
// фильтр по отзывам
function RevueCard({ revue, user }: RevueCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  console.log(revue);

  return (
    <Box mt={1} style={{ width: '100%' }}>
      <Container style={{ padding: '16px' }}>
        <Card sx={{ width: '100%' }}>
          <>
            <CardContent>
              <Typography style={{ color: '#4a875d' }} variant="h6" color="text.secondary">
                {revue.User?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(revue.date).toLocaleDateString()}
              </Typography>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}
              >
                <Rating
                  style={{ color: '#4a875d' }}
                  name="read-only"
                  value={revue.rating}
                  readOnly
                />
              </Box>
              <Typography gutterBottom variant="h5" component="div">
                {revue.text}
              </Typography>
            </CardContent>
            <CardActions>
              {((user.data.status === 'logged' && user.isAdmin) ||
                (user.data.status === 'logged' && user.id === revue.userId)) && (
                <>
                  <Button
                    onClick={() => void dispatch(deleteRevueThunk({ id: revue.id }))}
                    size="small"
                  >
                    Удалить
                  </Button>
                  {user.data.status === 'logged' && user.id === revue.userId && (
                    <Button onClick={() => setOpen(true)} size="small">
                      Редактировать
                    </Button>
                  )}
                </>
              )}

              {user.data.status === 'logged' && user.isAdmin && !revue.status && (
                <Button
                  onClick={() =>
                    void dispatch(changeStatusThunk({ id: revue.id, status: !revue.status }))
                  }
                  size="small"
                >
                  Одобрить
                </Button>
              )}
            </CardActions>
            {open && <RevueModal open={open} revue={revue} setOpen={setOpen} />}
          </>
        </Card>
      </Container>
    </Box>
  );
}

export default memo(RevueCard);
