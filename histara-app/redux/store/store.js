import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import userReducer from '../slice/userSlice';
import historyReducer from '../slice/historySlice';
import transactionReducer from '../slice/transactionSlice';
import loadTokenMiddleware from '../middleware/authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    history: historyReducer,
    transaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadTokenMiddleware),
});