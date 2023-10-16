import React from 'react';
import MasterForm from '../ui/masters/MasterForm';
import MasterList from '../ui/masters/MasterList';
import { useAppSelector } from '../../redux/hooks';

export default function MasterPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  return (
    <>
      {user.status === 'logged' && user.isAdmin && <MasterForm />}

      <MasterList />
    </>
  );
}
