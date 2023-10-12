import React, { useEffect, useState } from 'react';
import ServiceForm from '../ui/services/ServiceForm';
import ServiceList from '../ui/services/ServiceList';
import type { CategoryType } from '../../types/serviceTypes';
import { getCategories } from '../../services/serviceServices';

// размап по категориям

export default function ServicePage(): JSX.Element {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch(console.log);
  }, []);

  return (
    <>
      <ServiceForm />
      <ServiceList categories={categories} />
    </>
  );
}
