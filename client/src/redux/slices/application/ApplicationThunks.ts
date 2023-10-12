import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApplications, submitApplication } from '../../../services/applicationServices';
import type { ApplicationFormType, ApplicationType } from '../../../types/applicationTypes';

export const getApplicationsThunk = createAsyncThunk<ApplicationType[]>('application/getApplicationsThunk', async () =>
    getApplications(),
);

export const addApplicationThunk = createAsyncThunk<ApplicationType, ApplicationFormType>(
    'application/addApplicationThunk',
    async (formData) => submitApplication(formData),
);

