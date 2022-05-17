import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
    view: false,
    pb: false,
    uploadingMenu:false,
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
    toggleUploading:(state,action)=>{
      state.uploadingMenu = action.payload
    }
  },
});

export const { toggleMenu } = menuSlice.actions;
export const { toggleView } = menuSlice.actions;
export const { pbFalse } = menuSlice.actions;
export const { pbTrue } = menuSlice.actions;
export const { toggleUploading } = menuSlice.actions;


export default menuSlice.reducer;
