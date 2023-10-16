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


  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              {revue.User?.name}
              </Typography>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}
              >
                <Typography component="legend">Оценка:</Typography>
                <Rating name="read-only" value={revue.rating} readOnly />
              </Box>
              <Typography gutterBottom variant="h5" component="div">
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

              {user.status === 'logged' && user.isAdmin && !revue.status && (
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
