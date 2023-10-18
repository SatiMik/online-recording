import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { ServiceType, ServicesMastersType } from '../../../../../types/serviceTypes';
import { getService } from '../../../../../services/serviceServices';
import type { OnlineRecordFormType } from '../../../../../types/onlineRecordTypes';
import { useAppSelector } from '../../../../../redux/hooks';
import { addRecord } from '../../../../../services/onlineRecordService';

type ModalRecordProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  service: ServiceType;
};
export default function OnlineModalRecordService({
  open,
  setOpen,
  service,
}: ModalRecordProps): JSX.Element {
  const [masters, setMasters] = useState<ServicesMastersType[]>([]);
  const [value, setValue] = useState<Dayjs | null>(dayjs('2023-10-17'));
  const [option, setOption] = useState(0);
  const [chosen, setChosen] = useState(0);

  const user = useAppSelector((store) => store.user);
  const [input, setInput] = useState<OnlineRecordFormType>({
    serviceId: service.id,
    masterId: masters[option]?.Master?.id,
    date: 1200,
    time: 1200,
    userId: (user.status === 'logged' && user.id) || 0,
  });

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent): void => {
    setOption(event.target?.value);
    setInput((prev) => ({ ...prev, masterId: masters[option]?.Master?.id }));
  };

  useEffect(() => {
    getService(Number(service.id))
      .then((data) => setMasters(data))
      .catch(console.log);
  }, []);
  console.log(masters);
  const addRecordHandler = (): void => {
    addRecord(input)
      .then(() => setOpen(false))
      .catch(console.log);
  };
  const freeTimes = [10, 11, 12, 13, 14, 15];

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography gutterBottom variant="h5" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Выберите день:
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
              {masters.map((master, i) => (
                <MenuItem value={master?.Master?.id}>{master?.Master?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {freeTimes.map((freeTime, i) => (
          <Button
            style={{ backgroundColor: chosen === i + 1 ? 'violet' : 'white' }}
            key={freeTime}
            size="small"
            onClick={() => {
              setChosen(i + 1);
            }}
          >
            {freeTime}:00
          </Button>
        ))}
        <Button onClick={addRecordHandler}>Записаться</Button>
      </Box>
    </Modal>
  );
}
