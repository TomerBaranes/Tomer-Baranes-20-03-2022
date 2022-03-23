import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCoordsFromAddress = createAsyncThunk(
  "location/getCoordsFromAddress",
  async (address) => {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((res) => res.json());
  }
);

const initialState = {
  value: "Tel Aviv",
  coords: {
    lat: "32.045",
    lng: "34.77",
  },
  status: null,
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.value = action.payload;
    },
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
  },
  extraReducers: {
    [getCoordsFromAddress.pending]: (state) => {
      state.status = "loading";
    },
    [getCoordsFromAddress.fulfilled]: (state, action) => {
      state.coords.lat = action.payload.results[0].geometry.location.lat;
      state.coords.lng = action.payload.results[0].geometry.location.lng;
      state.status = "success";
    },
    [getCoordsFromAddress.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { setCity, setCoords } = citySlice.actions;

export default citySlice.reducer;
