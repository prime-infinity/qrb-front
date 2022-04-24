import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createRestReducer from "./slices/createRestSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    createrest: createRestReducer,
  },
});

export default store;
