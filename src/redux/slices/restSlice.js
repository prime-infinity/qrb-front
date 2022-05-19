import { createSlice } from "@reduxjs/toolkit";
import { getIndexRest } from "../../helpers/web";

export const restSlice = createSlice({
  name: "rest",
  initialState: {
    rest: null,
    restInited:false
  },
  reducers: {
    setRest: (state, action) => {
      state.rest = action.payload;
    },
    setRestSummary: (state, action) => {
      state.rest = { ...state.rest, summary: action.payload };
    },
    setRestInited:(state,action) =>{
      state.restInited = action.payload
    },
    setRestImages: (state, action) => {
      state.rest = { ...state.rest, images: action.payload };
    }
  },
});

export const { setRest } = restSlice.actions;
export const { setRestSummary } = restSlice.actions;
export const { setRestImages } = restSlice.actions;
export const { setRestInited } = restSlice.actions;

/*export const getRestOwnerRest = (token) => async (dispatch) => {
  const dataFromGet = await getRestOfOwner(token);
  dispatch(setRest(dataFromGet));
  console.log("rest owner");
};*/

export const initIndexRest = () => async (dispatch) => {
  const dataFromGet = await getIndexRest();
  dispatch(setRest(dataFromGet));
  console.log("index rest gotten");
};

export default restSlice.reducer;
