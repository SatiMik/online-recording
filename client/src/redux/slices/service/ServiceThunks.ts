import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ServiceFormType, ServiceType } from '../../../types/serviceTypes';
import {
  deleteService,
  editService,
  getService,
  getServices,
  submitService,
} from '../../../services/serviceServices';
import type { CategoryType } from '../../../types/categoryTypes';

export const getServiceThunk = createAsyncThunk<ServiceType[], CategoryType['id']>(
  'services/getServiceThunk',
  async (id) => getServices(id),
);
export const deleteServiceThunk = createAsyncThunk<ServiceType['id'], { id: ServiceType['id'] }>(
  'services/deleteServiceThunk',
  async ({ id }) => deleteService(id),
);

export const addServiceThunk = createAsyncThunk<ServiceType, ServiceFormType>(
  'services/addServiceThunk',
  async (inputs) => submitService(inputs),
);

export const editServiceThunk = createAsyncThunk<
  ServiceType,
  { id: ServiceType['id']; formData: ServiceFormType }
>('/services/editServiceThunk', async ({ id, formData }) => editService(id, formData));


