import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createRestReducer from "./slices/createRestSlice";
import restReducer from "./slices/restSlice";
import restDetailsReducer from "./slices/restDetailsSlice";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    createrest: createRestReducer,
    rest: restReducer,
    restdetails: restDetailsReducer,
    menu: menuReducer,
  },
});

export default store;
