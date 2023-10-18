import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addRecordThunk, deleteRecordThunk } from '../../../redux/slices/recordAdmin/RecordThunks';
import ServiceMasterForm from './ServiceMasterForm';
import ServiceForm from './ServiceForm';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';
// eslint-disable-next-line import/no-named-as-default
import getServicesThunk from '../../../redux/slices/serviceAdmin/ServiceThunk';

type RecordFormPropsType = {
  record: RecordFromBackType | Record<string, never>;
  handleClose: () => void;
};
export default function RecordForm({ record, handleClose }: RecordFormPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const masters = useAppSelector((store) => store.mastersAdmin);
  const services = useAppSelector((store) => store.servicesAdmin);
  console.log(record);
  console.log(services);
  const [inputs, setInputs] = useState({
    date: 1,
    time: record.time,
    service: record.record ? record.record.Service.name : '',
    master: record.master ? record.master.name : '',
    user: record.record ? record.record.User.name : '',
    phone: record.record ? record.record.User.phone : '',
  });
  useEffect(() => {
    void dispatch(getServicesThunk({ id: record.master.id, status: record.statusFree }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setMaster = (newMaster: string): void => {
    setInputs((prev) => ({ ...prev, master: newMaster }));
  };
  const setService = (newService: string): void => {
    setInputs((prev) => ({ ...prev, service: newService }));
  };
  const buttonMessage = record.record ? 'Редактировать' : 'Добавить';
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Box display="flex" flexDirection="column" textAlign="center">
      {record.record ? (
        <ServiceMasterForm mastersObj={masters} value={inputs.master} setValue={setMaster} />
      ) : (
        <TextField
          disabled
          fullWidth
          name="master"
          variant="outlined"
          margin="normal"
          placeholder="Мастер"
          value={inputs.master}
          onChange={changeHandler}
        />
      )}

      <TextField
        disabled={!record.record}
        fullWidth
        name="time"
        variant="outlined"
        margin="normal"
        placeholder="Время"
        value={inputs.time}
        onChange={changeHandler}
      />
      <ServiceForm servicesObj={services} value={inputs.service} setValue={setService} />
      {/* <TextField
        fullWidth
        name="service"
        variant="outlined"
        margin="normal"
        placeholder="Услуга"
        value={inputs.service}
        onChange={changeHandler}
      /> */}
      <TextField
        fullWidth
        name="user"
        variant="outlined"
        margin="normal"
        placeholder="Имя"
        value={inputs.user}
        onChange={changeHandler}
      />
      <TextField
        fullWidth
        name="phone"
        variant="outlined"
        margin="normal"
        placeholder="Телефон"
        value={inputs.phone}
        onChange={changeHandler}
      />
      <Box mt={2}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            if (record.record) void dispatch(deleteRecordThunk(record.record.id));
            void dispatch(addRecordThunk(inputs));
            handleClose();
          }}
        >
          {buttonMessage}
        </Button>
        {record.record && (
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              if (record.record) void dispatch(deleteRecordThunk(record.record.id));
              handleClose();
            }}
          >
            Удалить
          </Button>
        )}
        <Button variant="outlined" size="large" onClick={handleClose}>
          Закрыть
        </Button>
      </Box>
    </Box>
  );
}
