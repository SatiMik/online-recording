/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import type { MasterFormType, MasterType } from '../../../types/masterTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { editMasterThunk } from '../../../redux/slices/master/MasterThunks';

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

type WaitingModalProps = {
  openWaitingModal: boolean;
  setOpenWaitingModal: (open: boolean) => void;
};

export default function RevueWaitingModal({
  openWaitingModal,
  setOpenWaitingModal,
}: WaitingModalProps): JSX.Element {
  return (
    <Modal
      open={openWaitingModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography gutterBottom variant="h5" component="div">
          Спасибо за отзыв! Наши модераторы его проверяют, а Вы пока можете потусить на нашем сайте!
        </Typography>
        <Button
          onClick={() => {
            setOpenWaitingModal(false);
          }}
        >
          Хорошо!
        </Button>
      </Box>
    </Modal>
  );
}
