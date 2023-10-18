import React, { useEffect, useLayoutEffect, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { getService } from '../../../services/serviceServices';
import type { ServicesMastersType } from '../../../types/serviceTypes';
import type { OnlineRecordFormType } from '../../../types/onlineRecordTypes';


export default function OnlineChooseMasterPage(): JSX.Element {
  const [service, setService] = useState<ServicesMastersType[]>([]);
  const { serviceId } = useParams();
  const [option, setOption] = useState(0);
  const [freeTimes, setFreeTimes] = useState([]);

  const handleChange = (event: SelectChangeEvent): void => {
    setOption(event.target?.value);
  };

  useLayoutEffect(() => {
    getService(Number(serviceId))
      .then((data) => setService(data))
      .catch(console.log);
  }, []);

  const [value, setValue] = useState<Dayjs | null>(dayjs('2023-10-17'));

  // const [input, setInput] = useState<OnlineRecordFormType>({
  //   time: 0,
  //   serviceId: service.serviceId,
  //   masterId: service.master,
  //   userId: 0,
  // });

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {service[0]?.Service?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Цена: {service[0]?.Service?.price} рублей
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Время процедуры: {service[0]?.Service?.time} минут
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Выберите мастера:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
            <Typography variant="body2" color="text.secondary">
              Выберите мастера:
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={option}
                  label="Мастер"
                  onChange={handleChange}
                >
                  {service.map((master, i) => (
                    <MenuItem value={i + 1}>{master?.Master?.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {freeTimes.map((freeTime) => (
              <Button size="small">свободное время</Button>
            ))}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
