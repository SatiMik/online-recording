import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/UserSlice';
import recordsReducer from './slices/recordAdmin/RecordSlice';
import mastersReducer from './slices/masterAdmin/MasterSlice';
import servicesReducer from './slices/serviceAdmin/ServiceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    recordsAdmin: recordsReducer,
    mastersAdmin: mastersReducer,
    servicesAdmin: servicesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
