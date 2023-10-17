import { createSlice } from '@reduxjs/toolkit';
import type { UserRecordType } from '../../../types/userRecordTypes';
import { getUserRecordsThunk } from './UserRecordsThunks';

type UserRecordState = UserRecordType[];
const initialState: UserRecordState = [];

export const ServiceSlice = createSlice({
  name: 'userRecords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserRecordsThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getUserRecordsThunk.rejected, (state, action) => []);
  },
});

export default ServiceSlice.reducer;
