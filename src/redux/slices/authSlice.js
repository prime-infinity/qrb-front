import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocal, saveToLocal } from "../../helpers/storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
    authConfam: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setIsResOwner: (state, action) => {
      state.auth = { ...state.auth, isRestOwner: action.payload };
    },
    setAuthConfam: (state, action) => {
      state.authConfam = action.payload;
    },
    setAuthDetails: (state, action) => {
      let { fullname, email, phone } = action.payload;
      state.auth = {
        ...state.auth,
        fullname: fullname,
        email: email,
        phone: phone,
      };
    },
  },
});

export const { setAuth } = authSlice.actions;
export const { setIsResOwner } = authSlice.actions;
export const { setAuthConfam } = authSlice.actions;
export const { setAuthDetails } = authSlice.actions;

export const getAuth = () => async (dispatch) => {
  const dataFromGet = await loadFromLocal();
  dispatch(setAuth(dataFromGet));
  dispatch(setAuthConfam(true));
  console.log("is getting auth");
};

export const saveAuthToLocal = () => (dispatch, getState) => {
  saveToLocal(getState().auth.auth);
};

export default authSlice.reducer;
