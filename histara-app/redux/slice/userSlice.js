import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "UserData",
  initialState: {
    user: {
      email: null,
      name: null,
      phoneNumber: null,
      birthday: null,
      gender: null,
      work: null,
      profilePicture: null
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = {
        email: null,
        name: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
        work: null,
        profilePicture: null
      };
    }
  }
});

export const getUser = (state) => state.user.user;

export const { setUser, clearUserData } = userSlice.actions;

export default userSlice.reducer;
