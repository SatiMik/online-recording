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
  Link,
} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import type { MasterType } from '../../../types/masterTypes';
import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteMasterThunk } from '../../../redux/slices/master/MasterThunks';
import MasterModal from './MasterModal';
import MasterWorkModal from './MasterWorkModal';

const linkStyle = { color: 'violet', mr: 2, fontFamily: 'Raleway, Arial' };

type BookCardPropsType = {
  master: MasterType;
  user: UserLoadingType;
};

function MasterCard({ master, user }: BookCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [works, setWorks] = useState<boolean>(false);

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ width: 345 }}>
          <CardMedia sx={{ height: 160 }} image={master.img} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {master.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {master.desc}
            </Typography>
            <Button onClick={() => setWorks(true)} size="small" sx={{ mt: 2 }}>
              Посмотреть работы
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
            <Link key="Открыть" component={NavLink} to={`/online-record/masters/${master.id}/services`} sx={linkStyle}>
              <Button  variant="contained">
                Записаться
              </Button>
            </Link>
          </CardActions>
          {open && <MasterModal open={open} master={master} setOpen={setOpen} />}
          {works && <MasterWorkModal works={works} setWorks={setWorks} master={master} />}
        </Card>
      </Container>
    </Box>
  );
}

export default memo(MasterCard);
