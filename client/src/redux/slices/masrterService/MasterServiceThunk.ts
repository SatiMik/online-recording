import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MasterServiceFormType, MasterServiceType } from '../../../types/masterServiceType';
import {

    getMasterServices, submitMasterServices
} from '../../../services/masterServiceServices';

export const getMasterServicesThunk = createAsyncThunk<MasterServiceType[]>('masters/:masterId/getMasterServicesThunk', async (masterId) =>
    getMasterServices(masterId),
);


export const addMasterServicesThunk = createAsyncThunk<MasterServiceType, MasterServiceFormType>(
    'masters/:masterId/addMasterServicesThunk',
    async (inputs) => submitMasterServices(inputs),
);

