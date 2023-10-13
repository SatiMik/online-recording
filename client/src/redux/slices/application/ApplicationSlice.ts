import { createSlice } from '@reduxjs/toolkit';
import type { ApplicationType } from '../../../types/applicationTypes';
import { getApplicationsThunk, addApplicationThunk, deleteApplicationThunk } from './ApplicationThunks';

type MangasState = ApplicationType[];
const initialState: MangasState = [];

export const mangaSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getApplicationsThunk.fulfilled, (state, action) => action.payload);
        builder.addCase(getApplicationsThunk.rejected, (state, action) => []);

        builder.addCase(addApplicationThunk.fulfilled, (state, action) => [action.payload, ...state]);
        builder.addCase(addApplicationThunk.rejected, (state, action) => state);

        builder.addCase(deleteApplicationThunk.fulfilled, (state, action) =>
            state.filter((el) => el.id !== action.payload),
        );
        builder.addCase(deleteApplicationThunk.rejected, (state, action) => state);
    },
});

export default mangaSlice.reducer;