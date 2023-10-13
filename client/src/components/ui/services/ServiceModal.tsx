/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

import { Box, Button, Modal, TextField } from '@mui/material';
import type { MasterFormType, MasterType } from '../../../types/masterTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { editMasterThunk } from '../../../redux/slices/master/MasterThunks';
import type { ServiceFormType, ServiceType } from '../../../types/serviceTypes';
import { editServiceThunk } from '../../../redux/slices/service/ServiceThunks';

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

type ServiceModalProps = {
  service: ServiceType;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function ServiceModal({ service, open, setOpen }: ServiceModalProps): JSX.Element {
  const [input, setInput] = useState<ServiceFormType>({
    name: service.name,
    price: service.price,
    time: service.time,
    categoryId: service.categoryId,
  });
  const dispatch = useAppDispatch();
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          name="name"
          variant="outlined"
          placeholder="Название услуги"
          value={input.name}
          onChange={changeHandler}
        />
        <TextField
          name="desc"
          variant="outlined"
          placeholder="Цена"
          value={input.price}
          onChange={changeHandler}
        />
        <TextField
          name="img"
          variant="outlined"
          placeholder="Время оказания услуги"
          value={input.time}
          onChange={changeHandler}
        />
        <Button
          onClick={() => {
            void dispatch(editServiceThunk({ id: service.id, formData: input }));
            setOpen(false);
          }}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Modal>
  );
}

export default ServiceModal;
