import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getWeather = createAsyncThunk(
  "location/getWeather",
  async ({ locationKey, degree }) => {
    const api = {
      base: `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
      query: `?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&metric=${degree}`,
    };
    return fetch(api.base + api.query).then((res) => res.json());
  }
);

const initialState = {
  data: {},
  status: null,
};

export const getWeatherSlice = createSlice({
  name: "weather",
  initialState,
  extraReducers: {
    [getWeather.pending]: (state) => {
      state.status = "loading";
    },
    [getWeather.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getWeather.rejected]: (state, action) => {
      state.data = action;
      state.status = "failed";
    },
  },
});

export default getWeatherSlice.reducer;
