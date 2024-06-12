// redux/slice/historySlice.js
import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    historyData: [],
  },
  reducers: {
    setHistoryData: (state, action) => {
      state.historyData = action.payload;
    },
  },
});

export const { setHistoryData } = historySlice.actions;

export const selectHistoryData = (state) => state.history.historyData;

export default historySlice.reducer;
