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
  Box,
  Container,
  Fab,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { MasterType } from '../../../types/masterTypes';
import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteMasterThunk } from '../../../redux/slices/master/MasterThunks';
import MasterModal from './MasterModal';
import MasterWorkModal from './MasterWorkModal';
import OnlineModalRecordMaster from '../online-record/masterRecord/modalMaster/OnlineModalRecordMaster';

const linkStyle = { color: 'violet', mr: 2, fontFamily: 'Raleway, Arial' };

type BookCardPropsType = {
  master: MasterType;
  user: UserLoadingType;
};

function MasterCard({ master, user }: BookCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [works, setWorks] = useState<boolean>(false);
  const [openOnline, setOpenOnline] = useState<boolean>(false);

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ width: 500 }}>
          <CardMedia sx={{ height: 400 }} image={master.img} title="green iguana" />
          <CardContent sx={{ height: 150 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexDirection: 'column' }}>
              <Box sx={{ marginBottom: '10px', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {master.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {master.desc}
                </Typography>
              </Box>

              {(user.status === 'logged' && !user.isAdmin) || user.status === 'guest' ? (
                <Button onClick={() => setWorks(true)} size="small" sx={{ mt: 1 }}>
                  Посмотреть работы
                </Button>
              ) : null}
            </Box>
          </CardContent>
          {works && <MasterWorkModal works={works} setWorks={setWorks} master={master} />}
          <CardActions sx={{ justifyContent: 'space-between' }}>
            {(user.status === 'logged' && !user.isAdmin) || user.status === 'guest' ? (
              <Button onClick={() => setOpenOnline(true)} variant="contained">
                Записаться
              </Button>
            ) : null}
            {user.status === 'logged' && user?.isAdmin && (
              <>
                <Button
                  onClick={() => void dispatch(deleteMasterThunk({ id: master.id }))}
                  size="medium"
                >
                  <Grid item xs={8}>
                    <DeleteIcon
                      sx={{ height: 40, width: 200, marginLeft: -10, marginRight: -10 }}
                      color="newColor"
                    />
                  </Grid>
                </Button>
                <Button onClick={() => setOpen(true)} size="small">
                  <Fab color="newColor" aria-label="edit" sx={{ height: 45, width: 45 }}>
                    <EditIcon />
                  </Fab>
                </Button>
              </>
            )}
          </CardActions>
          {open && <MasterModal open={open} master={master} setOpen={setOpen} />}
          {openOnline && (
            <OnlineModalRecordMaster open={openOnline} setOpen={setOpenOnline} master={master} />
          )}
        </Card>
      </Container>
    </Box>
  );
}

export default memo(MasterCard);
