import React from 'react'
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

type MasterServiceCardProps = {
    service: any,
}

export default function MasterServiceCard({ service }: MasterServiceCardProps): JSX.Element {
    console.log(service);

    return (
        <Box sx={{ display: 'flex' }}>

            <Card sx={{ width: 400, boxShadow: 10, marginBottom: '20px' }}>
                <CardContent sx={{ display: 'flex', }}>
                    <Box>

                        <Typography variant="body1" >
                            {service.name}
                        </Typography>
                        <Typography variant="body1" >
                            {service.price}
                        </Typography>
                        <Typography variant="body1" >
                            {service.time} часа
                        </Typography>
                    </Box>
                    <Button variant="contained" sx={{ marginLeft: 'auto', height: '100%', alignSelf: 'center' }}>Выбрать</Button>
                </CardContent>
            </Card>
        </Box >
    )
}
