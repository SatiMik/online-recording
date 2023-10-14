import React from 'react';
// import ServiceForm from '../ui/services/ServiceForm';
// import ServiceList from '../ui/services/ServiceList';

import ServiceForm from '../ui/services/ServiceForm';
import ServiceList from '../ui/services/ServiceList';
import { useAppSelector } from '../../redux/hooks';

// размап по категориям! (отдельно все категории)

export default function ServicePage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  return (
    <>
      {user.status === 'logged' && user.isAdmin && <ServiceForm />}
      <ServiceList />
    </>
  );
}
