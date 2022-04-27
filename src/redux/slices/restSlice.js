import { createSlice } from "@reduxjs/toolkit";
import { getRestOfOwner, getRandomRest} from "../../helpers/web"

export const restSlice = createSlice({
  name: "rest",
  initialState: {
    rest: null,
  },
  reducers: {
    setRest: (state, action) => {
      state.rest = action.payload;
    },
    setRestSummary:(state,action)=>{
      state.rest = {...state.rest,summary:action.payload}
    },
    setRestImages:(state,action)=>{
      state.rest = {...state.rest,images:action.payload}
    }
  },
});

export const { setRest } = restSlice.actions;
export const { setRestSummary } = restSlice.actions;
export const { setRestImages } = restSlice.actions;


export const getRestOwnerRest = (token) => async (dispatch) => {
  const dataFromGet = await getRestOfOwner(token);
  dispatch(setRest(dataFromGet));
  console.log("rest owner");
};
export const getRandRest = () => async (dispatch) => {
  const dataFromGet = await getRandomRest();
  dispatch(setRest(dataFromGet));
  console.log("random rest");
};

export default restSlice.reducer;
