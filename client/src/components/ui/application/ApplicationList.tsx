import React from 'react';
import { Box } from '@mui/material';
import ApplicationCard from './ApplicationCard';
import { useAppSelector } from '../../../redux/hooks';

export default function PostsList(): JSX.Element {
    const applications = useAppSelector((store) => store.application);

    return (
        <Box display="flex" flexWrap="wrap">
            {applications?.map((application) => <ApplicationCard key={application.id} application={application} />)}
        </Box>
    );
}