import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createRestReducer from "./slices/createRestSlice";
import restReducer from "./slices/restSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    createrest: createRestReducer,
    rest: restReducer,
  },
});

export default store;
