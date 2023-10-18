import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material';
<<<<<<<< HEAD:client/src/components/ui/online-record/OnlineMastersPage.tsx
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getMastersThunk } from '../../../redux/slices/master/MasterThunks';
import OnlineMasterCard from './OnlineMasterCard';
========
import OnlineMasterCard from './OnlineMasterCard';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getMastersThunk } from '../../../../redux/slices/master/MasterThunks';
>>>>>>>> dev:client/src/components/ui/online-record/masterRecord/OnlineMastersPage.tsx

export default function OnlineMastersPage(): JSX.Element {
    const masters = useAppSelector((store) => store.masters);
    // console.log("master = ", masters)
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
