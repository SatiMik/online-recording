import React from 'react';
import { Box } from '@mui/material';
import MasterForm from '../ui/masters/MasterForm';
import MasterList from '../ui/masters/MasterList';
import { useAppSelector } from '../../redux/hooks';

export default function MasterPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  return (
    <>
      {user.data.status === 'logged' && user.isAdmin && <MasterForm />}

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <MasterList />
      </Box>
    </>
  );
}
