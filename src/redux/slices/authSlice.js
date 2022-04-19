import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocal, saveToLocal } from "../../helpers/storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const getAuth = () => async (dispatch) => {
  const dataFromGet = await loadFromLocal();
  dispatch(setAuth(dataFromGet));
  console.log("is getting auth");
};

export const saveAuthToLocal = () => (dispatch, getState) => {
  saveToLocal(getState().auth.auth);
};

export default authSlice.reducer;
