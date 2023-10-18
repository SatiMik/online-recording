import { createSlice } from '@reduxjs/toolkit';
import type { RecordsFromBackType } from '../../../types/recordAdminTypes';
import { addRecordThunk, deleteRecordThunk, getRecordsThunk } from './RecordThunks';

type RecordsState = RecordsFromBackType[];
const initialState: RecordsState = [];

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecordsThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getRecordsThunk.rejected, (state, action) => state);

    builder.addCase(addRecordThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(addRecordThunk.rejected, (state, action) => state);

    builder.addCase(deleteRecordThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(deleteRecordThunk.rejected, (state, action) => state);
  },
});

export default recordsSlice.reducer;
