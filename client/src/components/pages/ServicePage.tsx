import React from 'react';


import Carousel from 'react-material-ui-carousel';
import ServiceForm from '../ui/services/ServiceForm';
import ServiceList from '../ui/services/ServiceList';
import { useAppSelector } from '../../redux/hooks';

const imageStyle = {
  maxWidth: '90%', // Устанавливаем максимальную ширину изображения
  border: '2px solid #333', // Добавляем рамку
};
export default function ServicePage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  return (
    <>
      {user.status === 'logged' && user.isAdmin && <ServiceForm />}
      <ServiceList />
    </>
  );
}
