import { createSlice } from '@reduxjs/toolkit';
import type { UserLoadingType } from '../../../types/userTypes';
import {
  checkUserThunk,
  loginHandlerThunk,
  logoutHandlerThunk,
  signUpHandlerThunk,
  userCheckCodeThunk,
} from './UserThunks';

type UserState = {
  data: UserLoadingType;
  error: Error | null;
}
const initialState: UserState = {
  data: { status: 'loading' },
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserThunk.pending, (state) => { state.data = { status: 'loading' }; });
    builder.addCase(checkUserThunk.fulfilled, (state, action) => {
      state.data = { ...action.payload, status: 'logged' };
    });
    builder.addCase(checkUserThunk.rejected, (state) => {
      state.data = { status: 'guest' };
    });
    builder.addCase(signUpHandlerThunk.fulfilled, (state, action) => {
      state.data = { ...action.payload, status: 'logged' };
    });
    builder.addCase(signUpHandlerThunk.rejected, (state, action) => {
      state.data = { status: 'guest' };
      state.error = new Error(action.error.message);
    });
    builder.addCase(loginHandlerThunk.fulfilled, (state, action) => {
      state.data = { ...action.payload, status: 'logged' };
    });
    builder.addCase(loginHandlerThunk.rejected, (state, action) => {
      state.data = { status: 'guest' };
      state.error = new Error(action.error.message);
    });
    builder.addCase(logoutHandlerThunk.fulfilled, (state) => { state.data = { status: 'guest' }; });
    builder.addCase(userCheckCodeThunk.pending, (state) => { state.data = { status: 'loading' }; });
    builder.addCase(userCheckCodeThunk.fulfilled, (state, action) => {
      state.data = { ...action.payload, status: 'logged' };
    });
  },
});

export default userSlice.reducer;
