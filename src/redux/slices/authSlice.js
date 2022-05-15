import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocal, saveToLocal } from "../../helpers/storage";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
    hasInited:false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setHasIntited:(state,action)=>{
      state.hasInited = action.payload
    },
    setIsResOwner: (state, action) => {
      state.auth = { ...state.auth, isRestOwner: action.payload };
    },
  },
});

export const { setAuth } = authSlice.actions;
export const { setIsResOwner } = authSlice.actions;
export const { setHasIntited } = authSlice.actions;


export const getAuth = () => async (dispatch) => {
  const dataFromGet = await loadFromLocal();
  dispatch(setAuth(dataFromGet));
  dispatch(setHasIntited(true))
  console.log("is getting auth");
};

export const saveAuthToLocal = () => (dispatch, getState) => {
  saveToLocal(getState().auth.auth);
};

export default authSlice.reducer;
