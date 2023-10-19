/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';

import { Box, Button, Modal } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { useAppDispatch } from '../../../redux/hooks';

import MasterWork from './MasterWork';
import type { MasterType, MasterWorkType } from '../../../types/masterTypes';
import { getWorks } from '../../../services/masterServices';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type MasterWorkModalProps = {
  works: boolean;
  setWorks: (works: boolean) => void;
  master: MasterType;
};

export default function MasterWorkModal({
  works,
  setWorks,
  master,
}: MasterWorkModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [items, setItems] = useState<MasterWorkType[]>([]);
  useEffect(() => {
    getWorks(master.id)
      .then((data) => setItems(data))
      .catch(console.log);
  }, []);

  return (
    <Modal
      open={works}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Carousel>
          {items.map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <MasterWork key={i} item={item} />
            ))}
        </Carousel>
            <Button onClick={() => setWorks(false)}>Закрыть</Button>
      </Box>
    </Modal>
  );
}
