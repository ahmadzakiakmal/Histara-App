import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const getToken = (state) => state.auth.token;

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
