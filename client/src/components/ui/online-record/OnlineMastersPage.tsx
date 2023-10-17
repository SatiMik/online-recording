import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getMastersThunk } from '../../../redux/slices/master/MasterThunks';
import OnlineMasterCard from './OnlineMasterCard';

export default function OnlineMastersPage(): JSX.Element {
    const masters = useAppSelector((store) => store.masters);

    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getMastersThunk())
    }, []);
    return (
        <Box mt={5}>
            <Container >
                <h2>Наши мастера:</h2>
                {masters?.map((master) => <OnlineMasterCard key={master.id} master={master} />)}
            </Container>
        </Box>

    )
}
