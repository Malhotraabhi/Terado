import { configureStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginSlice";

let store = configureStore({
  reducer: {
    Login: LoginReducer,
  
  },
});

export { store };
