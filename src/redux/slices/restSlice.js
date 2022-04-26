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
  },
});

export const { setRest } = restSlice.actions;

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
