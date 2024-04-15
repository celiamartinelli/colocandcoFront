import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import loginMiddleware from './loginMiddleware';
import SignJoinColocMiddleware from './SignJoinColocMiddleware';
import SignUpColocMiddleware from './SignUpColocMiddleware';
import CreateProfileMiddleware from './CreateProfileMiddleware';

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: userSlice, // Use the userSlice reducer for the 'user' slice of the store
  },
  // Apply middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginMiddleware,
      SignJoinColocMiddleware,
      SignUpColocMiddleware,
      CreateProfileMiddleware
    ),
});

export default store;
