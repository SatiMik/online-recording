import React from 'react'
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import type { ApplicationType } from '../../../types/applicationTypes'

type ApplicationItemTypeProps = {
    application: ApplicationType;
}
export default function ApplicationCard({ application }: ApplicationItemTypeProps): JSX.Element {
    return (
        <Card sx={{ width: 345 }}>
            <CardHeader as="h5" title="Featured" />
            <CardContent>
                <Typography variant="h6" component="div">
                    {application.clientName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {application.phone}
                </Typography>
                <Button variant="contained">Принята</Button>
            </CardContent>
        </Card>
    )
}
