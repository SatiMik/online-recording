import React from 'react';
import CategoryForm from '../ui/categories/CategoryForm';
import CategoryList from '../ui/categories/CategoryList';

export default function CategoryPage(): JSX.Element {
  return (
    <>
      <CategoryForm />
      <CategoryList />
    </>
  );
}
