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
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { addRecord } from '../../../../../services/onlineRecordService';
import { getRecordsThunk } from '../../../../../redux/slices/recordAdmin/RecordThunks';

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
  const [chosen, setChosen] = useState(1);
  const [times, setTimes] = useState([]);
  const [isRecord, setIsRecord] = useState(false);

  const user = useAppSelector((store) => store.user);
  const [input, setInput] = useState<OnlineRecordFormType>({
    serviceId: service.id,
    masterId: masters[option]?.Master?.id,
    date: value,
    time: 0,
    userId: (user.data.status === 'logged' && user.id) || 0,
  });

  const handleClose = (): void => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getRecordsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const records = useAppSelector((store) => store.recordsAdmin).filter(
    (el) => el.master.id === masters[option]?.Master?.id,
  )[0];
  const selectHandler = (event: SelectChangeEvent): void => {
    setOption(event.target?.value);

    const rightRecords = records?.records.filter(
      (el) => el.statusFree * 30 >= masters[option]?.Service?.time,
    );
    console.log(rightRecords);
    console.log(masters);

    setTimes(rightRecords);

    setChosen(1);
  };

  useEffect(() => {
    getService(Number(service.id))
      .then((data) => setMasters(data))
      .catch(console.log);
  }, []);

  const addRecordHandler = (): void => {
    setInput((prev) => ({
      ...prev,
      masterId: masters[option]?.Master?.id,
      time: times[chosen - 1]?.time,
    }));
    setIsRecord((prev) => !prev);
  };
  useEffect(() => {
    if (input.time !== 0)
      addRecord(input)
        .then(() => setOpen(false))
        .catch(console.log);
  }, [isRecord]);
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
              onChange={selectHandler}
            >
              {masters?.map((master, i) => (
                <MenuItem value={master?.Master?.id}>{master?.Master?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {times?.map((freeTime, i) => (
          <Button
            style={{ backgroundColor: chosen === i + 1 ? 'violet' : 'white' }}
            key={freeTime}
            size="small"
            onClick={() => {
              setChosen(i + 1);
            }}
          >
            {freeTime.time % 100
              ? `${Math.floor(freeTime.time / 100)}:30`
              : `${Math.floor(freeTime.time / 100)}:00`}
          </Button>
        ))}
        <Button onClick={addRecordHandler}>Записаться</Button>
      </Box>
    </Modal>
  );
}
