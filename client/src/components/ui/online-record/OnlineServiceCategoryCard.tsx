import React from 'react'
import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import type { CategoryType } from '../../../types/categoryTypes';

type CategoryProps = {
    category: CategoryType
}
export default function OnlineServiceCategoryCard({ category }: CategoryProps): JSX.Element {
    const { id: categoryId } = category;


    return (
        <Card sx={{ maxWidth: 345, marginBottom: '40px' }}>
            {/* <CardHeader title="Категория" /> */}
            <CardContent>
                <Typography variant="h5" component="div">
                    {category.name}
                </Typography>
                <RouterLink key='Категория услуг' to={`/online-record/services/category/${categoryId}`} style={{ textAlign: 'center' }}>
                    <Button variant="contained">Перейти</Button>
                </RouterLink>
            </CardContent>
        </Card>
    )
}