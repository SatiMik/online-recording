import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { addMasterServicesThunk } from '../../../../redux/slices/masterService/MasterServiceThunk';

type MasterServiceCardProps = {
  service: any;
  master: any;
};

export default function OnlineMasterServiceCard({
  service,
  master,
}: MasterServiceCardProps): JSX.Element {
  // санка, стате на инпут, прокинуть мастера

  console.log(master, service);
  const user = useAppSelector((store) => store.user);

  console.log(new Date().toUTCString());

  const dateArray = [1, 2, 3, 4, 5];
  const timeArray = ['10:00', '11:00', '12:00', '13:00'];
  const [inputRecord, setInputRecord] = useState({
    userId: (user.data.status === 'logged' && user.id) || 0,
    masterId: master.id,
    serviceId: service.id,
    date: dateArray[0],
    time: timeArray[0],
  });

  const dispatch = useAppDispatch();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputRecord((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Card sx={{ width: 400, boxShadow: 10, marginBottom: '20px' }}>
        <CardContent sx={{ display: 'flex' }}>
          <Box>
            <Typography variant="body1">{service.name}</Typography>
            {/* <TextField>---</TextField> */}
            <Typography variant="body1">{service.price}</Typography>
            <Typography variant="body1">{service.time} часа</Typography>
          </Box>
          <RadioGroup
            sx={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            // onChange={changeHandler}
            // value={inputRecord.date}
          >
            {dateArray?.map((date) => (
              <FormControlLabel value={date} control={<Radio />} label={date} />
            ))}
          </RadioGroup>
          <RadioGroup
            sx={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            {timeArray?.map((time) => (
              <FormControlLabel key={time} value={time} control={<Radio />} label={time} />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            sx={{ marginLeft: 'auto', height: '100%', alignSelf: 'center' }}
            onClick={() => void dispatch(addMasterServicesThunk(inputRecord))}
          >
            Записаться
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
