import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "dark",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    switchMode: (state) => {
      if (state.value === "light") {
        state.value = "dark";
      } else {
        state.value = "light";
      }
    },
  },
});

export const { switchMode } = modeSlice.actions;

export default modeSlice.reducer;
