/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { memo, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Container,
  Link,
} from '@mui/material';

import { Link as NavLink } from 'react-router-dom';
import type { UserLoadingType } from '../../../types/userTypes';
import { useAppDispatch } from '../../../redux/hooks';
import type { CategoryType } from '../../../types/categoryTypes';
import { deleteCategoryThunk } from '../../../redux/slices/categories/CategoryThunks';
import CategoryModal from './CategoryModal';


type CategoryCardPropsType = {
  category: CategoryType;
  user: UserLoadingType;
};


const categoryImgArr = [{img:'https://static.tildacdn.com/tild6130-3937-4562-b163-383239646430/1618492697_37-p-kosm.jpeg'},{img:'https://mia-bags.ru/wp-content/uploads/3/0/0/300352d84f75a57dd4a8853e4f3ff15b.jpeg'},{img:'https://salonv.ru/upload/iblock/6c8/inpo633b79wemkzd89x1p1e6mxs02lry.jpg'}]
// сделать всю карточку кнопкой
const linkStyle = { color: 'violet', mr: 2, fontFamily: 'Raleway, Arial' };
function CategoryCard({ category, user }: CategoryCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  console.log(category.id);
  

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ width: 345 }}>
          <CardMedia component="img" height="240" image={categoryImgArr[category.id-1].img} alt="Image" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {category.name}
            </Typography>
            <Link key="Открыть" component={NavLink} to={`/services/${category.id}`} sx={{ textAlign: 'center' }}>
              <Button variant="contained">Перейти</Button>
            </Link>
          </CardContent>
          <CardActions>
            {user.status === 'logged' && user?.isAdmin && (
              <>
                <Button
                  onClick={() => void dispatch(deleteCategoryThunk({ id: category.id }))}
                  size="small"
                >
                  Удалить
                </Button>
                <Button onClick={() => setOpen(true)} size="small">
                  Редактировать
                </Button>
              </>
            )}
          </CardActions>
          {open && <CategoryModal open={open} category={category} setOpen={setOpen} />}
        </Card>
      </Container>
    </Box>
  );
}

export default memo(CategoryCard);
