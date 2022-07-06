import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
    menuSlideInited: false,
    view: false,
    pb: false,
    uploadingMenu: false,
    searchBar: false,
    isAddingCat: false,
    overlay: false,
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
    toggleUploading: (state, action) => {
      state.uploadingMenu = action.payload;
    },
    toggleSearchBar: (state, action) => {
      state.searchBar = !state.searchBar;
    },
    initMenuSlide: (state, action) => {
      state.menuSlideInited = action.payload;
    },
    toggleAddingCat: (state, action) => {
      state.isAddingCat = action.payload;
    },
    toggleOverlay: (state, action) => {
      state.overlay = action.payload;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export const { toggleView } = menuSlice.actions;
export const { pbFalse } = menuSlice.actions;
export const { pbTrue } = menuSlice.actions;
export const { toggleUploading } = menuSlice.actions;
export const { toggleSearchBar } = menuSlice.actions;
export const { initMenuSlide } = menuSlice.actions;
export const { toggleAddingCat } = menuSlice.actions;
export const { toggleOverlay } = menuSlice.actions;

export default menuSlice.reducer;

/** i made this comment is the yong branch */
