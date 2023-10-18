import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServiceType } from '../../../types/serviceAdminTypes';
import { getServices } from '../../../services/serviceAdminServices';

export const getServicesThunk = createAsyncThunk<ServiceType[], { id: number; status: number }>(
  'services/getServicesThunk',
  async ({ id, status }) => getServices({ id, status }),
);

export default getServicesThunk;
