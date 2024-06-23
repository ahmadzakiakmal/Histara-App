import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

export const loadToken = createAsyncThunk('auth/loadToken', async (_, { rejectWithValue }) => {
  try {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to load token from storage', error);
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "AuthToken",
  initialState: {
    token: null,
    status: 'idle',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      SecureStore.setItemAsync('authToken', action.payload).catch(error => {
        console.error('Failed to save token to storage', error);
      });
    },
    clearToken: (state) => {
      state.token = null;
      SecureStore.deleteItemAsync('authToken').catch(error => {
        console.error('Failed to remove token from storage', error);
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = 'idle';
      })
      .addCase(loadToken.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const getToken = (state) => state.auth.token;

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
