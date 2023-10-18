import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Toolbar, Button } from '@mui/material';

import ApplicationList from '../ui/application/NotAcceptedApplicationList';
import { getApplicationsThunk } from '../../redux/slices/application/ApplicationThunks';
import { useAppDispatch } from '../../redux/hooks';
import NotAcceptedApplicationList from '../ui/application/NotAcceptedApplicationList';
import AcceptedApplicationList from '../ui/application/AcceptedApplicationList';

export default function ApplicationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getApplicationsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // sdicsoidvncslodncslodncslkdnvljksnf
  const applications = useSelector((store) => store.application);
  const [notAccepted, setNotAccepted] = useState(true);
  const [accepted, setAccepted] = useState(false);
  return (

    <Box>
      <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box>
          <Button
            onClick={() => {
              setNotAccepted(true);
              setAccepted(false);
            }}
            style={{ border: '1px solid black', borderRadius: 0, margin: '10px' }}
          >
            Не принятые
          </Button>
          <Button
            onClick={() => {
              setAccepted(true);
              setNotAccepted(false);
            }}
            style={{ border: '1px solid black', borderRadius: 0, margin: '10px' }}
          >
            Принятые
          </Button>

          {notAccepted && <NotAcceptedApplicationList />}
          {accepted && <AcceptedApplicationList />}
        </Box>
      </Toolbar>

    </Box>
  );
}
