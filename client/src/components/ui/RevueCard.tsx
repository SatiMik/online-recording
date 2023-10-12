import React from 'react'

export default function RevueCard(): JSX.Element {
  return (
     <Card sx={{ width: 345 }}>
      <CardHeader as="h5" title="Featured" />
      <CardContent>
        <Typography variant="h6" component="div">
          Special title treatment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          With supporting text below as a natural lead-in to additional content.
        </Typography>
        <Button variant="contained">Go somewhere</Button>
      </CardContent>
    </Card>
  )
}
