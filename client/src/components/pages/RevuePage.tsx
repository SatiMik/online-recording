import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import RevueForm from '../ui/revue/RevueForm';
import RevueNotAcceptedList from '../ui/revue/RevueNotAcceptedList';
import RevueAcceptedList from '../ui/revue/RevueAcceptedList';


export default function RevuePage(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  return (
    <>
      {user.status === 'logged' && user.isAdmin && <RevueNotAcceptedList />}
      {user.status === 'logged' && <RevueForm />}
      
      <RevueAcceptedList />
    </>
  );
}
