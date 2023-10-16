import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import RevueForm from '../ui/revue/RevueForm';
import RevueList from '../ui/revue/RevueList';

export default function RevuePage(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  return (
    <>
      {user.status === 'logged'  && <RevueForm />}

      <RevueList />
    </>
  );
}
