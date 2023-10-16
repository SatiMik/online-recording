

import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
import MasterCard from './MasterCard'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getServiceThunk } from '../../../redux/slices/service/ServiceThunks';
import MasterServiceCard from './MasterServiceCard';

export default function MasterServicesPage(): JSX.Element {
    const services = useAppSelector((store) => store.services);

    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getServiceThunk())
    }, []);
    return (
        <Box mt={5}>
            <Container >
                <h2>Услуги</h2>
                {services?.map((service) => <MasterServiceCard key={service.id} service={service} />)}
            </Container>
        </Box>

    )
}
