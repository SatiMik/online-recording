import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/UserSlice';
import applicationReducer from './slices/application/ApplicationSlice';
import masterReducer from './slices/master/MasterSlice';
import saleReducer from './slices/sale/SaleSlice';
import serviceReducer from './slices/service/ServiceSlice';
import MasterServiceReducer from './slices/masrterService/MasterServiceSlice';
import categoriesReducer from './slices/categories/CategorySlice';
import revuesReducer from './slices/revue/RevueSlice';
import userRecordsReducer from './slices/userRecords/UserRecordsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    masters: masterReducer,
    sale: saleReducer,
    services: serviceReducer,
    categories: categoriesReducer,
    revues: revuesReducer,
    userRecords: userRecordsReducer,
    masterService: MasterServiceReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
