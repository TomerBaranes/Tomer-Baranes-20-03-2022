import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const degreeSlice = createSlice({
  name: "degree",
  initialState,
  reducers: {
    changeDegree: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeDegree } = degreeSlice.actions;

export default degreeSlice.reducer;
