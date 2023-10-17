

import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import OnlineMasterServiceCard from './OnlineMasterServiceCard';
import { getMasterServicesThunk } from '../../../redux/slices/masterService/MasterServiceThunk';

export default function OnlineMasterServicesPage(): JSX.Element {
    const services = useAppSelector((store) => store.masterService);

    const masterId = useParams()
    // console.log(services);
    const master = useAppSelector((store) => store.masters);
    console.log(master, '-------------------- master');

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getMasterServicesThunk(masterId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box mt={5}>
            <Container >
                <h2>Услуги этого мастера</h2>
                {services?.map((service) => <OnlineMasterServiceCard key={service.id} service={service} master={master} />)}
            </Container>
        </Box>

    )
}
