import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Button } from '@mui/material';
import type { MasterType } from '../../../types/masterAdminTypes';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getRecordsThunk } from '../../../redux/slices/recordAdmin/RecordThunks';
import ButtonItem from './ButtonItem';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';

type MastersPropsType = {
  master: MasterType;
  handleOpen: (record: RecordFromBackType) => void;
};
export default function MasterItem({ master, handleOpen }: MastersPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const records = useAppSelector((store) => store.recordsAdmin).filter(
    (record) => record.master.id === master.id,
  )[0];
  useEffect(() => {
    void dispatch(getRecordsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        style={{
          width: '300px',
          height: '50px',
          fontSize: '16px',
          borderColor: 'black',
          color: 'black',
          background: '#b58c7d',
          textTransform: 'uppercase',
          padding: '8px 16px',
          borderRadius: '0',
          border: '1px solid #566F5F',
        }}
        type="button"
      >
        {master.name}
      </Button>
      {records?.records?.map((record) =>
        record.status ? (
          <ButtonItem record={record} key={record.time} handleOpen={handleOpen} />
        ) : null,
      )}
    </Container>
  );
}
