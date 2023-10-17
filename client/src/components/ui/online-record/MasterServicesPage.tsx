

import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import MasterServiceCard from './MasterServiceCard';
import { getMasterServicesThunk } from '../../../redux/slices/masrterService/MasterServiceThunk';

export default function MasterServicesPage(): JSX.Element {
    const services = useAppSelector((store) => store.masterService);
    const masterId = useParams()

    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getMasterServicesThunk(masterId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box mt={5}>
            <Container >
                <h2>Услуги этого мастера</h2>
                {services?.map((service) => <MasterServiceCard key={service.id} service={service} />)}
            </Container>
        </Box>

    )
}
