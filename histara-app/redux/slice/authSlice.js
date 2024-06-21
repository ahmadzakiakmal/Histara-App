import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: "AuthToken",
  initialState: {
    token: null,
    status: 'idle',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem('authToken', action.payload).catch(error => {
        console.error('Failed to save token to storage', error);
      });
    },
    clearToken: (state) => {
      state.token = null;
      AsyncStorage.removeItem('authToken').catch(error => {
        console.error('Failed to remove token from storage', error);
      });
    }
  }
});

export const getToken = (state) => state.auth.token;

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
