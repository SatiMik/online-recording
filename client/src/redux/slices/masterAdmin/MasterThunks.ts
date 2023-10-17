import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MasterType } from '../../../types/masterAdminTypes';
import { getMasters } from '../../../services/masterAdminServices';

export const getMastersThunk = createAsyncThunk<MasterType[]>('masters/getMastersThunk', async () =>
  getMasters(),
);

export default getMastersThunk;
