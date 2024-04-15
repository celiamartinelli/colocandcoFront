import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import featureSlice from './featureSlice';
import middlewares from './middlewares/middlewares';

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: userSlice,
    feature: featureSlice,
  },
  // Apply middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export default store;
