import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
import MasterCard from './MasterCard'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getMastersThunk } from '../../../redux/slices/master/MasterThunks';

export default function MastersPage(): JSX.Element {
    const masters = useAppSelector((store) => store.masters);

    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getMastersThunk())
    }, []);
    return (
        <Box mt={5}>
            <Container >
                <h2>Наши мастера:</h2>
                {masters?.map((master) => <MasterCard key={master.id} master={master} />)}
            </Container>
        </Box>

    )
}
