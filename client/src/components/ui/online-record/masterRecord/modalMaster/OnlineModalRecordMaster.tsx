import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import type { MasterType } from '../../../../../types/masterTypes';
import type { ServicesMastersType } from '../../../../../types/serviceTypes';
import { getMaster } from '../../../../../services/masterServices';
import type { OnlineRecordFormType } from '../../../../../types/onlineRecordTypes';
import { addRecord } from '../../../../../services/onlineRecordService';
import { getRecordsThunk } from '../../../../../redux/slices/recordAdmin/RecordThunks';

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getRecordsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const records = useAppSelector((store) => store.recordsAdmin).filter(
    (el) => el.master.id === master.id,
  )[0];

  const [option, setOption] = useState(0);
  const user = useAppSelector((store) => store.user);

  const [chosen, setChosen] = useState(1);
  const [value, setValue] = useState<Dayjs | null>(dayjs('2023-10-17'));
  const [times, setTimes] = useState([]);
  const [input, setInput] = useState<OnlineRecordFormType>({
    serviceId: masterServices[option]?.Service?.id,
    masterId: master.id,
    date: value,
    time: 0,
    userId: (user.data.status === 'logged' && user.id) || 0,
  });
  const [isRecord, setIsRecord] = useState(false);
  const handleClose = (): void => {
    setOpen(false);
  };

  const selectHandler = (event: SelectChangeEvent): void => {
    setOption(event.target?.value);

    const rightRecords = records?.records.filter(
      (el) => el.statusFree * 30 >= masterServices[option]?.Service?.time,
    );

    setTimes(rightRecords);

    setChosen(1);
  };

  useEffect(() => {
    getMaster(Number(master.id))
      .then((data) => {
        setMasterServices(data);
      })
      .catch(console.log);
  }, []);

  const addRecordHandler = (): void => {
    setInput((prev) => ({
      ...prev,
      serviceId: masterServices[option]?.Service?.id,
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
              onChange={selectHandler}
            >
              {masterServices.map((masterService, i) => (
                <MenuItem value={i + 1}>{masterService?.Service?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {times?.map((freeTime, i) => (
            <Button
              style={{ backgroundColor: chosen === i + 1 ? 'red' : 'white' }}
              key={freeTime}
              size="small"
              onClick={() => {
                setChosen(i + 1);
              }}
              size="small"
            >
              {freeTime.time % 100
                ? `${Math.floor(freeTime.time / 100)}:30`
                : `${Math.floor(freeTime.time / 100)}:00`}
            </Button>
          ))}
          <Button onClick={addRecordHandler}>Записаться</Button>
        </Box>
      </Box>
    </Modal>
  );
}
