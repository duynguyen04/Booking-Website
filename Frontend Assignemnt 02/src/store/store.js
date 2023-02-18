import { configureStore, createSlice } from "@reduxjs/toolkit";

const initcount = {
  username: "",
  email: "",
  fullName: "",
  isAdmin: false,
  phoneNumber: "",
};
const countSlide = createSlice({
  name: "auth",
  initialState: initcount,
  reducers: {
    // inc(state) {
    //   state.count++;
    // },
    logout(state) {
      state.username = "";
    },
    login(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.isAdmin = action.payload.isAdmin;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});
const store = configureStore({
  reducer: countSlide.reducer,
});
export const authAction = countSlide.actions;
export default store;
