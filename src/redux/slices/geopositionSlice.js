import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getGeoposition = createAsyncThunk(
  "location/getGeoposition",
  async (latLng) => {
    const api = {
      base: "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
      query: `?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${latLng}`,
    };
    return fetch(api.base + api.query).then((res) => res.json());
  }
);

const initialState = {
  data: {},
  status: null,
};

export const geopositionSlice = createSlice({
  name: "geoposition",
  initialState,
  reducers: {
    setDataKey: (state, action) => {
      state.data.Key = action.payload;
    },
  },
  extraReducers: {
    [getGeoposition.pending]: (state) => {
      state.status = "loading";
    },
    [getGeoposition.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getGeoposition.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { setDataKey } = geopositionSlice.actions;

export default geopositionSlice.reducer;
