import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/UserSlice';
import masterReducer from './slices/master/MasterSlice';
import serviceReducer from './slices/service/ServiceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    masters: masterReducer,
    services: serviceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
