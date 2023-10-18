import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MasterServiceFormType, MasterServiceType } from '../../../types/masterServiceType';
import {

    getMasterServices, submitMasterServices
} from '../../../services/masterServiceServices';

export const getMasterServicesThunk = createAsyncThunk<MasterServiceType[]>('masters/getMasterServicesThunk', async (masterId) =>
    getMasterServices(),
);


export const addMasterServicesThunk = createAsyncThunk<MasterServiceType, MasterServiceFormType>(
    'masters/addMasterServicesThunk',
    async (inputs) => submitMasterServices(inputs),
);

