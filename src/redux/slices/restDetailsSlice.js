import { createSlice } from "@reduxjs/toolkit";
import { getDetailsOfRest } from "../../helpers/web";

export const restDetailsSlice = createSlice({
  name: "restdetails",
  initialState: {
    details: null,
  },
  reducers: {
    setRestDetails: (state, action) => {
      state.details = action.payload;
    },
    setRestDetailSummary: (state, action) => {
      state.details = { ...state.details, summary: action.payload };
    },
    setRestDetailsImages: (state, action) => {
      state.details = { ...state.details, images: action.payload };
    },
  },
});

export const { setRestDetails } = restDetailsSlice.actions;
export const { setRestDetailSummary } = restDetailsSlice.actions;
export const { setRestDetailsImages } = restDetailsSlice.actions;

export const getRestDetails = (id) => async (dispatch) => {
  const dataFromGet = await getDetailsOfRest(id);
  dispatch(setRestDetails(dataFromGet));
  console.log("rest details");
};

export default restDetailsSlice.reducer;
