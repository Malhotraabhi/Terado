import { createSlice } from "@reduxjs/toolkit";

let LoginSlice = createSlice({
  name: "Login",
  initialState: {
    token: sessionStorage.getItem("token"),
  },
  reducers: {
    setLogin: (state, payload) => {
      sessionStorage.setItem("token", payload.payload);
      state.token = sessionStorage.getItem("token");
    },
    setLogOut: (state) => {
      sessionStorage.removeItem("token");
      state.token = sessionStorage.getItem("token");
    },
  },
});

let LoginReducer = LoginSlice.reducer;
let { setLogin, setLogOut } = LoginSlice.actions;

export { LoginSlice, LoginReducer, setLogin, setLogOut };
