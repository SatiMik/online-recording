import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getCategoryThunk } from '../../../redux/slices/categories/CategoryThunks';
import OnlineServiceCategoryCard from './OnlineServiceCategoryCard';

export default function OnlineServiceCategoryList(): JSX.Element {
    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getCategoryThunk());
    }, []);

    const categories = useAppSelector((store) => store.categories);
    console.log(categories);

    return (
        <Box>
            <Container>
                <h2>Категории</h2>
                {categories?.map((category) => (
                    <OnlineServiceCategoryCard key={category.id} category={category} />
                ))}
            </Container>
        </Box>
    );
}
