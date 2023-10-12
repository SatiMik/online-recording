import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MasterFormType, MasterType } from '../../../types/masterTypes';
import {
  deleteMaster,
  editMaster,
  getMasters,
  submitMaster,
} from '../../../services/masterServices';

export const getMastersThunk = createAsyncThunk<MasterType[]>('master/getMastersThunk', async () =>
  getMasters(),
);

export const deleteMasterThunk = createAsyncThunk<MasterType['id'], { id: MasterType['id'] }>(
  'master/deleteMasterThunk',
  async ({ id }) => deleteMaster(id),
);

export const addMasterThunk = createAsyncThunk<MasterType, MasterFormType>(
  'master/addMasterThunk',
  async (inputs) => submitMaster(inputs),
);

export const editMasterThunk = createAsyncThunk<
  MasterType,
  { id: MasterType['id']; formData: MasterFormType }
>('/master/deleteMasterThunk', async ({ id, formData }) => editMaster(id, formData));
