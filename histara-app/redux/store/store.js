import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import userReducer from '../slice/userSlice';
import historyReducer from '../slice/historySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    history: historyReducer,
  },
});