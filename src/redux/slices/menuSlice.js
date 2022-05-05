import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
  },
  reducers: {
    toggleMenu: (state, action) => {
      state.menu = !state.menu;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;

/** i made this comment is the yong branch */
