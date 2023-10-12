import React from 'react';
import MasterForm from '../ui/masters/MasterForm';
import MasterList from '../ui/masters/MasterList';

export default function MasterPage(): JSX.Element {
  return (
    <>
      <MasterForm />
      <MasterList />
    </>
  );
}
