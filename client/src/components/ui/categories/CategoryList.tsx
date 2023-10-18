import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';

import Carousel from 'react-material-ui-carousel';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import CategoryCard from './CategoryCard';
import { getCategoryThunk } from '../../../redux/slices/categories/CategoryThunks';

export default function CategoryList(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getCategoryThunk());
  }, []);
  const categories = useAppSelector((store) => store.categories);

  console.log(categories);

  const user = useAppSelector((store) => store.user);
  return (
    <Box mt={5}>
      <Container>
        <Carousel autoPlay interval={1000} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <img src="https://i.pinimg.com/236x/14/e3/2f/14e32ff019eb010020743fe48b23b578.jpg" alt="Salon 1" style={{ width: '90%', height: '90%', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
          <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <img src="https://i.pinimg.com/564x/2d/6b/55/2d6b55671c6948e81151460df417d601.jpg" alt="Salon 1" style={{ width: '90%', height: '90%', objectFit: 'cover', borderRadius: '8px' }} />
          </div>

        </Carousel>
        <Typography>Рады представить вам услуги нашего салона! Для вашего удобства вы можете выбрать категорию и просмотреть перечень услуг, которые мы можем вам предложить</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} user={user} style={{ flex: '0 0 calc(33.33% - 20px)' }} />
          ))}
        </div>
      </Container>
    </Box>
  );
}
