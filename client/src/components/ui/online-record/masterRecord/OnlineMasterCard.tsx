/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link, Link as RouterLink } from 'react-router-dom';

import type { MasterType } from '../../../../types/masterTypes';
import OnlineModalRecord from './modalMaster/OnlineModalRecord';
import { useAppSelector } from '../../../../redux/hooks';

type MasterCardProps = {
    master: MasterType
}

export default function OnlineMasterCard({ master }: MasterCardProps): JSX.Element {
    const { id: masterId } = master;
    // console.log("---", "Master = ", master)

    const [open, setOpen] = useState(false);

    const handleOpen = (): void => {
        setOpen(true)
    }
    // const services = useAppSelector((store) => store.masterService);
    
    return (
        <Grid container spacing={2} sx={{}}>
            {Array.from({ length: 1 }).map((_, idx) => (
                <Grid item key={idx} xs={12} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: '100px', }}>
                    <Card sx={{ width: 345 }}>
                        <CardMedia component="img" height="240" image={master.img} alt="Image" />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {master.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {master.desc}
                            </Typography>
                            <Box>
                                <Button variant="contained" onClick={handleOpen}>Перейти</Button>
                            </Box>
                            {/* <RouterLink key='Услуги мастера' to={`/online-record/masters/${masterId}/services`} style={{ textAlign: 'center' }}> */}
                            {/* </RouterLink> */}
                            <OnlineModalRecord open={open} setOpen={setOpen} master={master} />
                        </CardContent>
                    </Card>
                </Grid>
            ))
            }
        </Grid >
    )
}
