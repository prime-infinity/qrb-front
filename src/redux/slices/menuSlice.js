import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
    menuFade: false,
    menuSlideInited: false,
    view: false,
    pb: false,
    uploadingMenu: false,
    editingMenu: false,
    searchBar: false,
    isAddingCat: false,
    overlay: false,
    isLangModal: false,
    hasInitAdding: "",
    isEditnMenu: false,
    isScrolGsap: false,
    isDragMen: false,
    scrollToMain: null,
    scrollCatBarToTarget: null,
  },
  reducers: {
    setScrollCatBar: (state, action) => {
      state.scrollCatBarToTarget = action.payload;
    },
    setScrollToMain: (state, action) => {
      state.scrollToMain = action.payload;
    },
    setIsDragMen: (state, action) => {
      state.isDragMen = action.payload;
    },
    setIsScrolGsap: (state, action) => {
      state.isScrolGsap = action.payload;
    },
    setEditnMenu: (state, action) => {
      state.isEditnMenu = action.payload;
    },
    setAdding: (state, action) => {
      state.hasInitAdding = action.payload;
    },
    toggleMenu: (state, action) => {
      state.menu = !state.menu;
    },
    toggleMenuFade: (state, action) => {
      state.menuFade = !state.menuFade;
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
    toggleEditing: (state, action) => {
      state.editingMenu = action.payload;
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
    toggleLangModal: (state, action) => {
      state.isLangModal = action.payload;
    },
  },
});

export const { setScrollCatBar } = menuSlice.actions;
export const { setScrollToMain } = menuSlice.actions;
export const { setIsSwipingLeft } = menuSlice.actions;
export const { setIsDragMen } = menuSlice.actions;
export const { setIsScrolGsap } = menuSlice.actions;
export const { setEditnMenu } = menuSlice.actions;
export const { toggleMenu } = menuSlice.actions;
export const { toggleMenuFade } = menuSlice.actions;
export const { toggleView } = menuSlice.actions;
export const { pbFalse } = menuSlice.actions;
export const { pbTrue } = menuSlice.actions;
export const { toggleUploading } = menuSlice.actions;
export const { toggleEditing } = menuSlice.actions;
export const { toggleSearchBar } = menuSlice.actions;
export const { initMenuSlide } = menuSlice.actions;
export const { toggleAddingCat } = menuSlice.actions;
export const { toggleOverlay } = menuSlice.actions;
export const { toggleLangModal } = menuSlice.actions;
export const { setAdding } = menuSlice.actions;

export default menuSlice.reducer;

/** i made this comment is the yong branch */
