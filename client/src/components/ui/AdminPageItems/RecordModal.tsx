import { Box, Typography, Button, Modal } from '@mui/material';
import React from 'react';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';
import RecordForm from './RecordForm';

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

type ModalPropsType = {
  modalData: {
    status: boolean;
    record: RecordFromBackType | Record<string, never>;
  };
  handleClose: () => void;
};

export default function RecordModal({ modalData, handleClose }: ModalPropsType): JSX.Element {
  const date = 1;
  return (
    <Modal
      open={modalData.status}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} textAlign="center">
        {modalData.record.record ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`Редактировать запись к мастеру ${modalData.record.master.name}`}
            </Typography>
            <RecordForm record={modalData.record} handleClose={handleClose} />
          </>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Добавить запись
            </Typography>
            <RecordForm record={modalData.record} handleClose={handleClose} />
          </>
        )}
      </Box>
    </Modal>
  );
}
