import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLocationAutocomplete = createAsyncThunk(
  "location/getLocationAutocomplete",
  async (city) => {
    const api = {
      base: "https://dataservice.accuweather.com/locations/v1/cities/autocomplete",
      query: `?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${city}`,
    };
    return fetch(api.base + api.query).then((res) => res.json());
  }
);

const initialState = {
  data: [],
  status: null,
};

const locationAutocompleteSlice = createSlice({
  name: "autocomplete",
  initialState,
  reducers: {
    resetAutocompleteData: (state) => {
      state.data = [];
    },
  },
  extraReducers: {
    [getLocationAutocomplete.pending]: (state) => {
      state.status = "loading";
    },
    [getLocationAutocomplete.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getLocationAutocomplete.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { resetAutocompleteData } = locationAutocompleteSlice.actions;

export default locationAutocompleteSlice.reducer;
