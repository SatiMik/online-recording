import React from 'react'
import ServiceForm from '../ui/services/ServiceForm'
import ServiceList from '../ui/services/ServiceList'



// размап по категориям

export default function ServicePage(): JSX.Element {
    return (
        <>
        <ServiceForm />
        <ServiceList />
      </>
    )
}
