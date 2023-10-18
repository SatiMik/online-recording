import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TimeItem from '../ui/AdminPageItems/TimeItem';
import { getRecordsThunk } from '../../redux/slices/recordAdmin/RecordThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMastersThunk } from '../../redux/slices/masterAdmin/MasterThunks';
import MasterItem from '../ui/AdminPageItems/MasterItem';
import type { RecordFromBackType } from '../../types/recordAdminTypes';
import RecordModal from '../ui/AdminPageItems/RecordModal';

export default function AdminPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const masters = useAppSelector((store) => store.mastersAdmin);
  useEffect(() => {
    void dispatch(getRecordsThunk());
    void dispatch(getMastersThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [modalData, setModalData] = useState({ status: false, record: {} });
  const handleOpen = (record: RecordFromBackType): void => setModalData({ status: true, record });
  const handleClose = (): void => setModalData({ status: false, record: {} });
  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'row' }}>
        <Container style={{ display: 'flex', flexDirection: 'column' }}>
          <TimeItem />
        </Container>
        {masters.map((master) => (
          <MasterItem key={master.id} master={master} handleOpen={handleOpen} />
        ))}
      </Container>
      <RecordModal modalData={modalData} handleClose={handleClose} />
    </>
  );
}
