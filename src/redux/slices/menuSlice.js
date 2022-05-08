import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
    view: false,
  },
  reducers: {
    toggleMenu: (state, action) => {
      state.menu = !state.menu;
    },
    toggleView: (state, action) => {
      state.view = !state.view;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export const { toggleView } = menuSlice.actions;

export default menuSlice.reducer;

/** i made this comment is the yong branch */
