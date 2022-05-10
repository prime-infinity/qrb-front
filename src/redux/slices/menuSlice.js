import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
    view: false,
    pb: false,
  },
  reducers: {
    toggleMenu: (state, action) => {
      state.menu = !state.menu;
    },
    toggleView: (state, action) => {
      state.view = !state.view;
    },
    pbFalse: (state, action) => {
      state.pb = false;
    },
    pbTrue: (state, action) => {
      state.pb = true;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export const { toggleView } = menuSlice.actions;
export const { pbFalse } = menuSlice.actions;
export const { pbTrue } = menuSlice.actions;

export default menuSlice.reducer;

/** i made this comment is the yong branch */
