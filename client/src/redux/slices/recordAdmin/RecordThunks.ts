import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RecordFormType, RecordsFromBackType } from '../../../types/recordAdminTypes';
import { deleteRecord, getRecords, submitRecord } from '../../../services/recordAdminServices';

export const getRecordsThunk = createAsyncThunk<RecordsFromBackType[]>(
  'records/getRecordsThunk',
  async () => getRecords(),
);

export const addRecordThunk = createAsyncThunk<RecordsFromBackType[], RecordFormType>(
  'posts/addPostThunk',
  async (formData) => submitRecord(formData),
);

export const deleteRecordThunk = createAsyncThunk<RecordsFromBackType[], number>(
  'posts/deletePostThunk',
  async (id) => deleteRecord(id),
);
