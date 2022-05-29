import { createSlice } from "@reduxjs/toolkit";
import { getIndexRest, getUrlRest } from "../../helpers/web";

export const restSlice = createSlice({
  name: "rest",
  initialState: {
    rest: null,
    restInited: false,
    restMenu: null,
  },
  reducers: {
    setRest: (state, action) => {
      state.rest = action.payload;
      state.restMenu = state.rest.menu;
    },
    setRestSummary: (state, action) => {
      state.rest = { ...state.rest, summary: action.payload };
    },
    setRestInited: (state, action) => {
      state.restInited = action.payload;
    },
    setRestImages: (state, action) => {
      state.rest = { ...state.rest, images: action.payload };
    },
    searchRestMenu: (state, action) => {
      state.restMenu = state.rest.menu.filter(
        (men) => men.name === action.payload
      );
    },
    searchDiscarded: (state, action) => {
      state.restMenu = state.rest.menu;
    },
  },
});

export const { setRest } = restSlice.actions;
export const { setRestSummary } = restSlice.actions;
export const { setRestImages } = restSlice.actions;
export const { setRestInited } = restSlice.actions;
export const { searchRestMenu } = restSlice.actions;
export const { searchDiscarded } = restSlice.actions;

export const initIndexRest = () => async (dispatch) => {
  const dataFromGet = await getIndexRest();
  dispatch(setRest(dataFromGet));
  console.log("index rest gotten");
};

export const initUrlRest = (restUrl) => async (dispatch) => {
  const dataFromGet = await getUrlRest(restUrl);
  dispatch(setRest(dataFromGet));
  console.log("url rest gotten");
};

export default restSlice.reducer;
