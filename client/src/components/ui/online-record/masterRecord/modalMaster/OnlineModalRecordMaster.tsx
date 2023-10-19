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
import { useAppSelector } from '../../../../../redux/hooks';
import type { MasterType } from '../../../../../types/masterTypes';
import type { ServicesMastersType } from '../../../../../types/serviceTypes';
import { getMaster } from '../../../../../services/masterServices';
import type { OnlineRecordFormType } from '../../../../../types/onlineRecordTypes';
import { addRecord } from '../../../../../services/onlineRecordService';

type ModalRecordProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  master: MasterType;
};
export default function OnlineModalRecordMaster({
  open,
  setOpen,
  master,
}: ModalRecordProps): JSX.Element {
  const [masterServices, setMasterServices] = useState<ServicesMastersType[]>([]);

  const [option, setOption] = useState(0);
  const user = useAppSelector((store) => store.user);
  const [chosen, setChosen] = useState(0);
  const [value, setValue] = useState<Dayjs | null>(dayjs('2023-10-17'));
  const [input, setInput] = useState<OnlineRecordFormType>({
    serviceId: masterServices[option]?.Service?.id,
    masterId: master.id,
    date: 1200,
    time: 1200,
    userId: (user.status === 'logged' && user.id) || 0,
  });

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent): void => {
    setOption(event.target?.value);
    setInput((prev) => ({ ...prev, serviceId: masterServices[option]?.Service?.id }));
  };

  useEffect(() => {
    getMaster(Number(master.id))
      .then((data) => {
        console.log(data)
        setMasterServices(data)
      })
      .catch(console.log);
  }, []);
  const freeTimes = [10, 11, 12, 13, 14, 15];
  const addRecordHandler = (): void => {
    addRecord(input)
      .then(() => setOpen(false))
      .catch(console.log);
  };
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
        <Typography
          id="keep-mounted-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: 'center', marginBottom: '20px' }}
        >
          Заполните форму для записи
        </Typography>
        <Typography
          id="keep-mounted-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: 'center', marginBottom: '20px' }}
        >
          Вы хотите записаться к {master.name}
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
          Выберите услугу:
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
              {masterServices.map((masterService, i) => (
                <MenuItem value={i + 1}>{masterService?.Service?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {freeTimes.map((freeTime, i) => (
            <Button
              style={{ backgroundColor: chosen === i + 1 ? '#4a875d' : 'white' }}
              key={freeTime}
              size="small"
              onClick={() => {
                setChosen(i + 1);
              }}
              size="small"
            >
              {freeTime}:00
            </Button>
          ))}
          <Button onClick={addRecordHandler}>Записаться</Button>
        </Box>
      </Box>
    </Modal>
  );
}
