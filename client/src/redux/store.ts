import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/UserSlice';
import applicationReducer from './slices/application/ApplicationSlice';
import masterReducer from './slices/master/MasterSlice';
import serviceReducer from './slices/service/ServiceSlice';
import categoriesReducer from './slices/categories/CategorySlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    masters: masterReducer,
    services: serviceReducer,
    categories: categoriesReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
