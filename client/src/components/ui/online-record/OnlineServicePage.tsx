import React from 'react'

import OnlineServiceCategoryPage from './OnlineServiceCategoryPage'
// import ServiceList from '../services/ServiceList'
// import CategoryPage from '../../pages/CategoryPage'

export default function OnlineServicePage(): JSX.Element {
    return (
        <>

            <h1>Выберите категорию услуги</h1>
            <OnlineServiceCategoryPage />
            {/* <CategoryPage /> */}
        </>
    )
}
