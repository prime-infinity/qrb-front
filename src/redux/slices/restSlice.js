import { createSlice } from "@reduxjs/toolkit";

export const restSlice = createSlice({
  name: "rest",
  initialState: {
    rest: null,
  },
  reducers: {
    setRest: (state, action) => {
      state.rest = action.payload;
    },
  },
});

export const { setRest } = restSlice.actions;

export default restSlice.reducer;
