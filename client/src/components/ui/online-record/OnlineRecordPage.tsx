import { Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import { Link as NavLink, Link } from 'react-router-dom';

import React from 'react'


export default function OnlineRecordPage(): JSX.Element {
    const links = [
        { name: 'Мастер', to: '/online-record/masters' },
        { name: 'Услуги', to: '/online-record/services' },
    ];
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
            {links.map((link) => (
                <Card key={link.name} sx={{ width: 345, boxShadow: 10, marginRight: '40px' }}>
                    <CardHeader title={link.name} sx={{ textAlign: 'center', marginTop: '20px' }} />
                    <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link key={link.name} component={NavLink} to={link.to} sx={{ textAlign: 'center'}}>
                            <Button variant="contained">Перейти</Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}
