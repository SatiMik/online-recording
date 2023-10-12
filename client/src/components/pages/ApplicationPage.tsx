import React, { useEffect } from 'react'
import ApplicationList from '../ui/application/ApplicationList'
import { getApplicationsThunk } from '../../redux/slices/application/ApplicationThunks';
import { useAppDispatch } from '../../redux/hooks';

export default function ApplicationPage(): JSX.Element {
    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getApplicationsThunk());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <ApplicationList />
}