/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';

import { Box, Button, Modal } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { useAppDispatch } from '../../../redux/hooks';

import MasterWork from './MasterWork';

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

const arr = [
  {
    image: 'https://screenshots.codesandbox.io/8e8dw/6.png',
    masterId: 1,
  },
  {
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/234b2896510375.5eb03a443f9f2.png',
    masterId: 1,
  },
];
type MasterWorkModalProps = {
  works: boolean;
  setWorks: (works: boolean) => void;
};

export default function MasterWorkModal({ works, setWorks }: MasterWorkModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  //   const [items, setItems] = useState<MasterWorkType[]>([]);

  //   useEffect(()=>},[])

  return (
    <Modal
      open={works}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Carousel>
          {arr.map((item, i) => (
            <>
              <MasterWork key={i} item={item} />
              <Button
                onClick={() => {
                  setWorks(false);
                }}
              >
                Закрыть
              </Button>
            </>
          ))}
        </Carousel>
      </Box>
    </Modal>
  );
}
