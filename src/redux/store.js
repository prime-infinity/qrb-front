import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import restReducer from "./slices/restSlice";
import restDetailsReducer from "./slices/restDetailsSlice";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    rest: restReducer,
    restdetails: restDetailsReducer,
    menu: menuReducer,
  },
});

export default store;
