import React from 'react';
import { Box } from '@mui/material';
import ApplicationCard from './ApplicationCard';
import { useAppSelector } from '../../../redux/hooks';



export default function NotAcceptedApplicationList(): JSX.Element {
    const applications = useAppSelector((store) => store.application);

    return (
        <Box style={{ width: 500, height: 200, borderRadius: '10px' }} display="flex" flexWrap="wrap" justifyContent="center">
            {applications?.map((application) => (
               !application.status && <ApplicationCard key={application.id} application={application} />
            ))}
        </Box>
    );
}