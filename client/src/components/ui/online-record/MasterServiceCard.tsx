import React from 'react'

type MasterServiceCardProps = {
    service: any,
}

export default function MasterServiceCard({ service }: MasterServiceCardProps): JSX.Element {
    return (
        <div>{service.name}</div>
    )
}
