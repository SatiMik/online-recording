/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserRecordType } from '../../../types/userRecordTypes';
import { deleteUserRecord, getUserRecords } from '../../../services/userRecordsService';

export const getUserRecordsThunk = createAsyncThunk<UserRecordType[]>(
  'user-records/getUserRecordsThunk',
  async () => getUserRecords(),
);

export const deleteUserRecordThunk = createAsyncThunk<UserRecordType['id'], UserRecordType['id']>(
  'user-records/deleteUserRecordThunk',
  async (id ) => deleteUserRecord(id),
);
