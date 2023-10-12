import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CategoryType, ServiceFormType, ServiceType } from '../../../types/serviceTypes';
import {
  deleteService,
  editService,
  getServices,
  submitService,
} from '../../../services/serviceServices';

export const getServiceThunk = createAsyncThunk<ServiceType[], CategoryType['id']>(
  'master/getServiceThunk',
  async (id) => getServices(id),
);

export const deleteServiceThunk = createAsyncThunk<ServiceType['id'], { id: ServiceType['id'] }>(
  'master/deleteServiceThunk',
  async ({ id }) => deleteService(id),
);

export const addServiceThunk = createAsyncThunk<ServiceType, ServiceFormType>(
  'master/addServiceThunk',
  async (inputs) => submitService(inputs),
);

export const editServiceThunk = createAsyncThunk<
  ServiceType,
  { id: ServiceType['id']; formData: ServiceFormType }
>('/master/editServiceThunk', async ({ id, formData }) => editService(id, formData));
