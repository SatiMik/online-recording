import React from 'react';
// import ServiceForm from '../ui/services/ServiceForm';
// import ServiceList from '../ui/services/ServiceList';

import ServiceForm from '../ui/services/ServiceForm';
import ServiceList from '../ui/services/ServiceList';

// размап по категориям! (отдельно все категории)

export default function ServicePage(): JSX.Element {
 
  return (
    <>
      <ServiceForm />
      <ServiceList />
    </>
  );
}
