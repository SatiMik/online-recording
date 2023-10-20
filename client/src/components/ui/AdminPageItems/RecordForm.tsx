import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addRecordThunk, deleteRecordThunk } from '../../../redux/slices/recordAdmin/RecordThunks';
import ServiceMasterForm from './ServiceMasterForm';
import ServiceForm from './ServiceForm';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';
// eslint-disable-next-line import/no-named-as-default
import getServicesThunk from '../../../redux/slices/serviceAdmin/ServiceThunk';
import type { MasterIdNameType } from '../../../types/masterAdminTypes';
import type { ServiceType } from '../../../types/serviceAdminTypes';
import TimeButtonsItem from './TimeButtonsItem';

type RecordFormPropsType = {
  record: RecordFromBackType | Record<string, never>;
  handleClose: () => void;
};
export default function RecordForm({ record, handleClose }: RecordFormPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const masters = useAppSelector((store) => store.mastersAdmin);
  const services = useAppSelector((store) => store.servicesAdmin);
  const records = useAppSelector((store) => store.recordsAdmin).filter(
    (el) => el.master.id === record.master.id,
  )[0];
  console.log('RecordFrom REOCORD: ', record.record);
  const [inputs, setInputs] = useState({
    date: 1,
    time: record.time,
    service: record.record ? record.record.Service : null,
    master: record.master.name,
    masterId: record.record ? 0 : record.master.id,
    user: record.record ? record.record.User.name : '',
    phone: record.record ? record.record.User.phone : '',
  });
  console.log(inputs);
  const [recordTimes, setRecordTimes] = useState<RecordFromBackType[] | null>();
  console.log('TIMES', recordTimes);
  const setMaster = (newMaster: MasterIdNameType): void => {
    setInputs((prev) => ({ ...prev, master: newMaster.name, masterId: newMaster.id }));
  };
  const setTime = (newTime: number): void => {
    setInputs((prev) => ({ ...prev, time: newTime }));
  };
  const setService = (newService: ServiceType | null, prevService: ServiceType | null): void => {
    setInputs((prev) => ({ ...prev, service: newService }));
    console.log('!!', newService, prevService);
    if (newService && prevService) {
      const rightRecords = records.records.filter((el) => el.statusFree * 30 >= newService.time);
      console.log('RIGHTREOCRDS', rightRecords);
      setRecordTimes(rightRecords);
    }
    console.log('AAAA');
  };
  useEffect(() => {
    if (inputs.masterId) {
      void dispatch(getServicesThunk({ id: inputs.masterId, status: record.statusFree }));
      setService(null, null);
    } else {
      void dispatch(getServicesThunk({ id: record.master.id, status: record.statusFree }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.master]);
  const buttonMessage = record.record ? 'Редактировать' : 'Добавить';
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Grid container rowSpacing={1} display="flex" flexDirection="column" textAlign="center">
      <Grid item>
        {record.record && (
          <ServiceMasterForm
            masters={masters.map((master) => ({ id: master.id, name: master.name }))}
            value={{ id: record.master.id, name: record.master.name }}
            setMaster={setMaster}
          />
        )}
      </Grid>
      <Grid item>
        <ServiceForm services={services} value={inputs.service} setService={setService} />
      </Grid>
      <Grid item>
        {record.record && (
          <TimeButtonsItem time={inputs.time} times={recordTimes} setTime={setTime} />
        )}
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          name="user"
          placeholder="Имя"
          value={inputs.user}
          onChange={changeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          name="phone"
          placeholder="Телефон"
          value={inputs.phone}
          onChange={changeHandler}
        />
      </Grid>
      <Grid mt={2}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            if (record.record) void dispatch(deleteRecordThunk(record.record.id));
            if (inputs.service)
              void dispatch(addRecordThunk({ ...inputs, service: inputs.service.name }));
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
      </Grid>
    </Grid>
  );
}
