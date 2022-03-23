import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getForecast = createAsyncThunk(
  "location/getForecast",
  async ({ locationKey, degree }) => {
    const api = {
      base: `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,
      query: `?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&metric=${degree}`,
    };
    return fetch(api.base + api.query).then((res) => res.json());
  }
);

const initialState = {
  data: {},
  status: null,
};

export const getForecastSlice = createSlice({
  name: "weather",
  initialState,
  extraReducers: {
    [getForecast.pending]: (state) => {
      state.status = "loading";
    },
    [getForecast.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getForecast.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default getForecastSlice.reducer;
