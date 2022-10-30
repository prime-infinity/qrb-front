import { createSlice } from "@reduxjs/toolkit";
import { getIndexRest, getUrlRest } from "../../helpers/web";

export const restSlice = createSlice({
  name: "rest",
  initialState: {
    rest: null,
    restInited: false,
    restToEdit: null,
    temp: null,
  },
  reducers: {
    setRestToEdit: (state, action) => {
      state.restToEdit = action.payload;
    },
    setRest: (state, action) => {
      state.rest = action.payload;
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
    setRestWelcomScreen: (state, action) => {
      state.rest = { ...state.rest, welcomescreen: action.payload };
    },
    searchRestMenu: (state, action) => {
      let findCat = state.rest.categories.filter(
        (cat) => cat.name === action.payload
      );
      if (findCat.length > 0) {
        state.temp = state.rest.categories;
        state.rest.categories = findCat;
      }
    },
    searchDiscarded: (state, action) => {
      if (state.temp?.length > 0) {
        state.rest.categories = state.temp;
        state.temp = null;
      }
    },
    resetRestCatOrder: (state, action) => {
      state.rest = { ...state.rest, categories: action.payload };
    },
  },
});

export const { setRest } = restSlice.actions;
export const { setRestToEdit } = restSlice.actions;
export const { setRestSummary } = restSlice.actions;
export const { setRestImages } = restSlice.actions;
export const { setRestWelcomScreen } = restSlice.actions;
export const { setRestInited } = restSlice.actions;
export const { searchRestMenu } = restSlice.actions;
export const { searchDiscarded } = restSlice.actions;
export const { resetRestCatOrder } = restSlice.actions;

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
