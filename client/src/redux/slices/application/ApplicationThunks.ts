import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteApplication, editStatusApplication, getApplications, submitApplication } from '../../../services/applicationServices';
import type { ApplicationFormType, ApplicationType } from '../../../types/applicationTypes';

export const getApplicationsThunk = createAsyncThunk<ApplicationType[]>('application/getApplicationsThunk', async () =>
    getApplications(),
);

export const addApplicationThunk = createAsyncThunk<ApplicationType, ApplicationFormType>(
    'application/addApplicationThunk',
    async (inputs) => submitApplication(inputs),
);

export const deleteApplicationThunk = createAsyncThunk<ApplicationType['id'], { id: ApplicationType['id'] }>(
    'application/deleteApplicationThink',
    async ({ id }) => deleteApplication(id),
)

// export const deleteMangaThunk = createAsyncThunk<MangaType['id'], { id: MangaType['id'] }>(
//     'manga/deleteMangaThunk',
//     async ({ id }) => deleteManga(id),
// );

export const changeStatusApplicationThunk = createAsyncThunk<
  ApplicationType,
  { id: ApplicationType['id']; status: ApplicationFormType['status'] }
>('application/changeStatusApplicationThunk', async ({ id, status }) => editStatusApplication(id, status));