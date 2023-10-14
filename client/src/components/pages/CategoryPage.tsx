import React from 'react';
import CategoryForm from '../ui/categories/CategoryForm';
import CategoryList from '../ui/categories/CategoryList';
import { useAppSelector } from '../../redux/hooks';

export default function CategoryPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  return (
    <>
      {user.status === 'logged' && user.isAdmin && <CategoryForm />}
      <CategoryList />
    </>
  );
}
