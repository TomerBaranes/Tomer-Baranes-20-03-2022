import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeFromFavorites: (state, action) => {
      state.data = state.data.filter((fav) => fav.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
