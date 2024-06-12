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
    },
    point: 0
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPoint: (state, action) => {
      state.point = action.payload;
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
export const getPoint = (state) => state.user.point;

export const { setPoint, setUser, clearUserData } = userSlice.actions;

export default userSlice.reducer;
