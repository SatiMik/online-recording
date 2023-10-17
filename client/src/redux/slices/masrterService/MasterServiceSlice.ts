import { createSlice } from '@reduxjs/toolkit';
import type { MasterServiceType } from '../../../types/masterServiceType';
import {
    getMasterServicesThunk, addMasterServicesThunk
} from './MasterServiceThunk';

type MasterState = MasterServiceType[];
const initialState: MasterState = [];

export const MasterServiceSlice = createSlice({
    name: 'masterService',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMasterServicesThunk.fulfilled, (state, action) => action.payload);
        builder.addCase(getMasterServicesThunk.rejected, (state, action) => []);

        builder.addCase(addMasterServicesThunk.fulfilled, (state, action) => [action.payload, ...state]);
        builder.addCase(addMasterServicesThunk.rejected, (state, action) => state);

    },
});

export default MasterServiceSlice.reducer;
