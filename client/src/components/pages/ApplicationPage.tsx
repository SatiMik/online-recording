import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ApplicationList from '../ui/application/ApplicationList'
import { getApplicationsThunk } from '../../redux/slices/application/ApplicationThunks';
import { useAppDispatch } from '../../redux/hooks';

export default function ApplicationPage(): JSX.Element {
    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getApplicationsThunk());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 //sdicsoidvncslodncslodncslkdnvljksnf
    const applications = useSelector((state) => state.application);
    return (
        <>
            <p>У вас {applications.length} заявок</p>
            <ApplicationList />
        </>
    )
}