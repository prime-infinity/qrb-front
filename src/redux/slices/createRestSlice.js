import { createSlice } from "@reduxjs/toolkit";

export const createRestSlice = createSlice({
  name: "createrest",
  initialState: {
    creationState: 1,
    restName: "",
    restLoc: "",
    restYear: "",
    restDesc: "",
  },
  reducers: {
    incrementCreationState: (state, action) => {
      state.creationState++;
    },
    setResName: (state, action) => {
      state.restName = action.payload;
    },
    setResLoc: (state, action) => {
      state.restLoc = action.payload;
    },
    setResYear: (state, action) => {
      state.restYear = action.payload;
    },
    setResDesc: (state, action) => {
      state.restDesc = action.payload;
    },
  },
});

export const { incrementCreationState } = createRestSlice.actions;
export const { setResName } = createRestSlice.actions;
export const { setResLoc } = createRestSlice.actions;
export const { setResYear } = createRestSlice.actions;
export const { setResDesc } = createRestSlice.actions;

export default createRestSlice.reducer;
