import { createSlice } from '@reduxjs/toolkit';
import type { UserRecordType } from '../../../types/userRecordTypes';
import { deleteUserRecordThunk, getUserRecordsThunk } from './UserRecordsThunks';

type UserRecordState = UserRecordType[];
const initialState: UserRecordState = [];

export const ServiceSlice = createSlice({
  name: 'userRecords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserRecordsThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getUserRecordsThunk.rejected, (state, action) => []);
    builder.addCase(deleteUserRecordThunk.fulfilled, (state, action) =>
    state.filter((el) => el.id !== action.payload),
  );
  builder.addCase(deleteUserRecordThunk.rejected, (state, action) => state);
  },
});

export default ServiceSlice.reducer;
