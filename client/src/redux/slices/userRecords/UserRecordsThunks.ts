/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserRecordType } from '../../../types/userRecordTypes';
import { getUserRecords } from '../../../services/userRecordsService';

export const getUserRecordsThunk = createAsyncThunk<UserRecordType[]>(
  'user-records/getUserRecordsThunk',
  async () => getUserRecords(),
);
