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

// сделать всю карточку кнопкой
const linkStyle = { color: 'violet', mr: 2, fontFamily: 'Raleway, Arial' };
function CategoryCard({ category, user }: CategoryCardPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  return (
    <Box mt={8}>
      <Container>
        <Card sx={{ width: 345 }}>
          {/* <CardMedia sx={{ height: 140 }} image={category.img} title="green iguana" /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {category.name}
            </Typography>

            {/* <Link key="Открыть" component={NavLink} to={`/services/${category.id}`} sx={linkStyle}>
              Открыть
            </Link> */}
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
