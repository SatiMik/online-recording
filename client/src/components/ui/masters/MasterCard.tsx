/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { memo, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
} from '@mui/material';
import type { MasterType } from '../../../types/masterTypes';
import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteMasterThunk } from '../../../redux/slices/master/MasterThunks';
import MasterModal from './MasterModal';

type BookCardPropsType = {
  master: MasterType;
  user: UserLoadingType;
};

function MasterCard({ master, user }: BookCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  
  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 140 }} image={master.img} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {master.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {master.desc}
            </Typography>
            <Button onClick={() => (window.location.href = `/master/${master.id}`)} size="small">
              Перейти на книгу
            </Button>
          </CardContent>
          <CardActions>
            {user.status === 'logged' && user?.isAdmin && (
              <>
                <Button
                  onClick={() => void dispatch(deleteMasterThunk({ id: master.id }))}
                  size="small"
                >
                  Удалить
                </Button>
                <Button onClick={() => setOpen(true)} size="small">
                  Редактировать
                </Button>
              </>
            )}
          </CardActions>
          {open && <MasterModal open={open} master={master} setOpen={setOpen} />}
        </Card>
      </Container>
    </Box>
  );
}

export default memo(MasterCard);
