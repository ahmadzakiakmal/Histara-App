import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "TransactionData",
  initialState: {
    transactionId: null,
    qrLink: null
  },
  reducers: {
    setTransactionId: (state, action) => {
      state.transactionId = action.payload;
    },
    setQrLink: (state, action) => {
      state.qrLink = action.payload;
    }
  }
});

export const getTransactionId = (state) => state.transaction.transactionId;
export const getQrLink = (state) => state.transaction.qrLink;

export const { setTransactionId, setQrLink } = transactionSlice.actions;

export default transactionSlice.reducer;
