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
  Fab,
  Grid,

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as NavLink } from 'react-router-dom';
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
        <Card sx={{ width: 405 }}>
          <CardMedia sx={{ height: 200 }} image={master.img} title="green iguana" />
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
                  size="medium"
                >
                  <Grid item xs={8} >
                    <DeleteIcon sx={{ height: 40, width: 200, marginLeft: -10, marginRight: -10 }} color="newColor" />
                  </Grid>
                </Button>
                <Button onClick={() => setOpen(true)} size="small" >
                  <Fab color="newColor" aria-label="edit" sx={{ height: 45, width: 45 }}>
                    <EditIcon />
                  </Fab>
                </Button>
              </>
            )}
            <CardActions sx={{ justifyContent: 'space-between' }}>

              <Button onClick={() => setOpenOnline(true)} variant="contained">Записаться</Button>
            </CardActions>
          </CardActions>
          {open && <MasterModal open={open} master={master} setOpen={setOpen} />}
          {works && <MasterWorkModal works={works} setWorks={setWorks} master={master} />}
          {openOnline && (
            <OnlineModalRecordMaster open={openOnline} setOpen={setOpenOnline} master={master} />
          )}
        </Card>
      </Container>
    </Box>
  );
}

export default memo(MasterCard);
